export const htmlSandpack = `<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon_white.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Realistic Render</title>
  </head>

  <body>
    <canvas class="webgl"></canvas>
    <script type="module" src="/index.js"></script>
  </body>

</html>
`;

export const cssSandpack = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  background: #0d1525;
}
.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  z-index: -1;
}
`;

export const jsSandpack = `
`;
