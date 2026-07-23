import { useEffect, useRef } from "react";
import "./AccentBlast.scss";

const DURATION = 1.0; // seconds; canvas hidden when the blast ends

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

// Wireframe-primitive blast: as the shockwave sweeps out from the click
// point, grid cells it passes pop in as tiny hairline primitives — squares,
// diamonds, triangles, circles, crosses (the site's glyph family). Each
// tumbles slightly as it scales in, flashes hot-filled for an instant, then
// settles to a thin stroke; the whole field fades to let the CSS transition
// through.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform vec2 uOrigin;   // px, canvas space
uniform vec3 uColor;    // accent rgb 0..1
uniform float uTime;    // 0..1 normalized progress
uniform float uMaxDist; // px, farthest corner from origin

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

// Normalized "radius" of a primitive at point uv: 1.0 on its outline.
// shape picks from the glyph family — square, diamond, triangle, circle,
// cross — all hairline-friendly SDF-ish metrics.
float primDist(vec2 uv, float shape) {
  if (shape < 1.0) return max(abs(uv.x), abs(uv.y)) * 2.2;      // square
  if (shape < 2.0) return (abs(uv.x) + abs(uv.y)) * 1.9;        // diamond
  if (shape < 3.0) {                                            // triangle
    return max(uv.y * 1.4 + abs(uv.x) * 2.2, -uv.y * 2.6) * 0.9;
  }
  if (shape < 4.0) return length(uv) * 2.4;                     // circle
  // cross / plus
  return min(max(abs(uv.x) * 5.0, abs(uv.y)), max(abs(uv.x), abs(uv.y) * 5.0)) * 2.4;
}

// One mosaic layer: wireframe primitives pop where the front has passed.
// size = cell px, density = fraction of cells that participate.
float mosaic(vec2 px, float radius, float t, float size, float density) {
  vec2 id = floor(px / size);
  vec2 uv = fract(px / size) - 0.5; // -0.5..0.5 inside cell
  float h = hash2(id * (1.0 + size * 0.01));
  if (h > density) return 0.0;

  vec2 center = (id + 0.5) * size;
  float cellDist = length(center - uOrigin);

  // Local life of this cell: starts when the front reaches it (plus its own
  // stagger) and stretches most of the blast, so the swept disc stays
  // populated until the global fade.
  float hit = radius - cellDist - h * 60.0;
  float life = clamp(hit / (uMaxDist * 0.95), 0.0, 1.0);
  if (life <= 0.0) return 0.0;

  // Pop envelope: crisp scale-in, restrained overshoot, then a soft trailing
  // fade as the front moves on. The trail is gentle and floors well above zero
  // (0.45 -> 1.4 window never fully resolves at life<=1), so the disc dims
  // smoothly behind the edge instead of hollowing into a chasing ring.
  float grow = smoothstep(0.0, 0.12, life);
  float trail = 1.0 - smoothstep(0.45, 1.4, life);
  // Global shrink: as the blast ends, every shape contracts to 0 size (not just
  // dims). Size and brightness vanish together, so the tail reads as a clean
  // collapse instead of stalling at some residual scale.
  float endFade = 1.0 - smoothstep(0.5, 0.95, t);
  float scale = grow * (1.0 + 0.12 * sin(life * 9.0) * (1.0 - life)) * trail * endFade;
  if (scale <= 0.001) return 0.0;

  // Tumble: each primitive starts at its own angle and keeps turning as it
  // lives — same read as the sketched glyphs drifting in the cursor trail.
  float spin = (h - 0.5) * 4.0;
  float a0 = h * 6.283 + life * spin;
  float ca = cos(a0), sa = sin(a0);
  uv = mat2(ca, -sa, sa, ca) * uv;

  // Shape from the glyph family, chosen per cell.
  float shape = floor(hash2(id + 17.0) * 5.0);
  float sd = primDist(uv, shape);
  // Size ramps with distance from the click: tiny sparks near the origin,
  // bigger primitives as the blast reaches further out...
  float sizeRamp = mix(0.45, 1.5, clamp(cellDist / uMaxDist, 0.0, 1.0));
  // ...and everything swells slightly as the blast plays out.
  float timeSwell = mix(0.85, 1.35, t);
  float half_ = 0.68 * scale * sizeRamp * timeSwell;

  // Hairline stroke on the outline — the primary read.
  float stroke = exp(-abs(sd - half_) * (34.0 + 90.0 * (1.0 - scale))) * 0.85;
  // Fill only flashes at birth, then dies fast — leaves pure wireframe.
  float flash = exp(-life * 6.0);
  float fill = (1.0 - smoothstep(half_ - 0.05, half_, sd)) * flash * 0.8;

  return (stroke + fill) * trail;
}

void main() {
  vec2 px = gl_FragCoord.xy;
  float t = uTime;

  // Ease-out expansion: the front leaves the click point at high velocity
  // (a real shock impulse), then decelerates into the edges — reads far
  // snappier than a symmetric ease that ramps up slowly.
  float et = 1.0 - pow(1.0 - t, 2.6);
  float radius = uMaxDist * 1.35 * et;

  // Two mosaic layers: big sparse primitives + small dense ones behind.
  float m = mosaic(px, radius, t, 72.0, 0.5);
  m += mosaic(px + 31.7, radius, t, 34.0, 0.4) * 0.7;

  float glow = m;
  // Primitives flash white-hot at birth via the mosaic flash term; tint the
  // overall peak slightly toward white.
  vec3 col = mix(uColor, vec3(1.0), clamp(glow - 1.1, 0.0, 0.35));

  // Global fade-out. Starts as the front nears the border (~t=0.4) so the blast
  // reads as expand-and-dissolve, not expand-then-linger.
  float fade = 1.0 - smoothstep(0.45, 0.9, t);
  float alpha = clamp(glow, 0.0, 1.0) * fade;

  gl_FragColor = vec4(col * alpha, alpha); // premultiplied
}
`;

const compile = (gl, type, src) => {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
};

/**
 * Fullscreen WebGL color-blast overlay. The context and shader program are
 * created ONCE at mount — page load pays the compile, so the first click
 * plays with zero jank. AppContext dispatches an "accent-blast" event with
 * the click origin + accent rgb; each blast just resizes the persistent
 * canvas, sets uniforms, and runs, then the canvas is hidden again while the
 * CSS accent transition finishes underneath.
 */
const AccentBlast = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let raf = 0;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return undefined;

    // Compile + link now, at load — not on first click.
    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const u = {
      res: gl.getUniformLocation(prog, "uRes"),
      origin: gl.getUniformLocation(prog, "uOrigin"),
      color: gl.getUniformLocation(prog, "uColor"),
      time: gl.getUniformLocation(prog, "uTime"),
      maxDist: gl.getUniformLocation(prog, "uMaxDist"),
    };

    // Warm the pipeline with one hidden draw so the driver finishes any lazy
    // work during load, not on the first blast frame.
    canvas.width = canvas.height = 4;
    gl.viewport(0, 0, 4, 4);
    gl.uniform1f(u.time, 0.5);
    gl.uniform2f(u.res, 4, 4);
    gl.uniform2f(u.origin, 2, 2);
    gl.uniform3f(u.color, 1, 1, 1);
    gl.uniform1f(u.maxDist, 4);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    const play = (e) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      cancelAnimationFrame(raf); // restart cleanly if mid-blast

      const { x, y, rgb } = e.detail;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.display = "block";
      gl.viewport(0, 0, canvas.width, canvas.height);

      const ox = x * dpr;
      const oy = canvas.height - y * dpr; // GL is bottom-left origin
      const maxDist = Math.max(
        Math.hypot(ox, oy),
        Math.hypot(canvas.width - ox, oy),
        Math.hypot(ox, canvas.height - oy),
        Math.hypot(canvas.width - ox, canvas.height - oy)
      );

      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform2f(u.origin, ox, oy);
      gl.uniform3f(u.color, rgb[0], rgb[1], rgb[2]);
      gl.uniform1f(u.maxDist, maxDist);

      const start = performance.now();
      const frame = (now) => {
        const t = (now - start) / 1000 / DURATION;
        if (t >= 1) {
          canvas.style.display = "none";
          // Free the fullscreen backing store between blasts.
          canvas.width = canvas.height = 1;
          return;
        }
        gl.uniform1f(u.time, t);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    window.addEventListener("accent-blast", play);
    return () => {
      window.removeEventListener("accent-blast", play);
      cancelAnimationFrame(raf);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="accent-blast"
      style={{ display: "none" }}
      aria-hidden="true"
    />
  );
};

export default AccentBlast;
