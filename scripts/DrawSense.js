import { draw } from "./draw.js";
class DrawSense {
  constructor(container) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
    this.ctx = this.canvas.getContext("2d");
    this.#eventListeners(container);
    this.paths = [];
    this.isDrawing = false;
    //apending the canvas into the container
    container.appendChild(this.canvas);
    this.#redraw();
  }
  #undo = document.getElementById("undo");
  #reset = document.getElementById("reset");
  #eventListeners = (container) => {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };
    document.onmouseup = (evt) => {
      this.isDrawing = false;
    };
    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(evt);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#redraw(this.paths);
      }
    };
    // touch events
    document.ontouchend = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmouseup(loc);
    };
    this.canvas.ontouchstart = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmousedown(loc);
    };
    this.canvas.ontouchmove = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmousemove(loc);
    };
    document.body.onresize = (evt) => {
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
      console.log("resize");
    };
    // control buttons
    this.#undo.onclick = () => {
      this.paths.pop();
      this.#redraw();
    };
    this.#reset.onclick = () => {
      this.paths = [];
      this.#redraw();
    };
  };
  #getMouse = (evt) => {
    const canvasRect = this.canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - canvasRect.left),
      Math.round(evt.clientY - canvasRect.top),
    ];
  };
  #redraw = () => {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    draw.paths(this.ctx, this.paths);
    if (this.paths.length > 0) {
      this.#undo.disabled = false;
      this.#reset.disabled = false;
      this.#reset.style.cursor = "auto";
      this.#undo.style.cursor = "auto";
    } else {
      this.#undo.disabled = true;
      this.#reset.disabled = true;
      this.#reset.style.cursor = "not-allowed";
      this.#undo.style.cursor = "not-allowed";
    }
  };
}
export default DrawSense;
