// glslShader.js

async function loadShaderSource(url) {
  const response = await fetch(url);
  return response.text();
}

async function initShader(canvasId = "skyCanvas", shaderUrl = "shader.frag") {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.error(`Canvas with id '${canvasId}' not found.`);
    return;
  }
  const shaderSource = await loadShaderSource(shaderUrl);

  const sandbox = new glsl.Canvas(canvas);
  sandbox.load(shaderSource);

  // Handle canvas resize
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

// Initialize on window load
window.addEventListener("load", () => {
  initShader();
});
