class Game {

  canvas() {
    document.createElement("canvas");
  }

  start(width = 800, height = 800) {
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.className = "ui center aligned"
    this.context = this.canvas.getContext("2d")
    document.body.append(this.canvas);
  }
}