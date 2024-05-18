export const htmlSandpack = `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My 3D Playground</title>
  </head>

  <body>
    <div id="app">
      <h3>Hello, 3D World!</h3>
      <p>This page is about to transform to 3d project...!</p>
    </div>
    <canvas class="webgl"></canvas>
    <script type="module" src="/index.js"></script>
  </body>
</html>`;

export const cssSandpack = `* {
    margin: 0;
    padding: 0;
}
#app{
  padding: 20px;
}
html, body{
    background: #121316;
    -webkit-font-smoothing: antialiased;
    color: #fff;
    font-family: 'Arial', sans-serif;
}
.webgl {
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
    z-index: -1;
}`;
