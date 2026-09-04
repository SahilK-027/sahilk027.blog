// Thin-line wireframe primitives — the same shape family that tumbles in the
// hero canvas, drawn as hairline SVG paths (viewBox 0 0 24 24). `pathLength=1`
// is set by consumers that want CSS stroke-draw animations.
export const GLYPH_PATHS = [
  // cube
  "M12 2 21 7.5 21 16.5 12 22 3 16.5 3 7.5 Z M3 7.5 12 13 21 7.5 M12 13 12 22",
  // tetrahedron
  "M12 3 21 19 3 19 Z M12 3 12.5 13.5 M12.5 13.5 21 19 M12.5 13.5 3 19",
  // octahedron
  "M12 2 20 12 12 22 4 12 Z M4 12 20 12 M12 2 12 22",
  // cone
  "M12 3 19 17.5 M12 3 5 17.5 M19 17.5 A7 2.5 0 1 1 5 17.5 A7 2.5 0 1 1 19 17.5",
  // sphere
  "M12 2 A10 10 0 1 1 12 22 A10 10 0 1 1 12 2 M12 2 A4.5 10 0 1 1 12 22 A4.5 10 0 1 1 12 2 M2.8 8.5 A10 3.5 0 0 0 21.2 8.5 M2.8 15.5 A10 3.5 0 0 1 21.2 15.5",
  // torus
  "M12 6 A9 6 0 1 1 12 18 A9 6 0 1 1 12 6 M12 10 A3.5 2.2 0 1 0 12 14.4 A3.5 2.2 0 1 0 12 10",
];
