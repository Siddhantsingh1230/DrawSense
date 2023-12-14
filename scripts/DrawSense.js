import { draw } from "./draw.js";
class DrawSense {
  constructor(container) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = container.clientWidth;
    this.canvas.height = container.clientHeight;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.style=`
        opacity:0.9;
    `;
    this.#eventListeners(container);
    this.paths = [];
    this.isDrawing = false;
    //apending the canvas into the container
    container.appendChild(this.canvas);
    this.#render();
  }
  #undo = document.getElementById("undo");
  #reset = document.getElementById("reset");
  #recognize = document.getElementById("recognize");
  #placeholder = document.querySelector(".canvasPlaceholder");
  #eventListeners = (container) => {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt);
      this.paths.push([mouse]);
      this.isDrawing = true;
      this.#placeholder.style.opacity ="0";
    };
    document.onmouseup = (evt) => {
      this.isDrawing = false;
    };
    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(evt);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#render(this.paths);
      }
    };
    // touch events
    document.ontouchend = (evt) => {
      const loc = evt.touches[0];
      document.onmouseup(loc);
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
    };
    // control buttons
    this.#undo.onclick = () => {
      if (this.paths.length) {
        this.paths.pop();
        this.#render();
        (this.paths.length)==0?this.#placeholder.style.opacity ="0.85":null;
      }
    };
    this.#reset.onclick = () => {
      if (this.paths.length) {
        this.paths = [];
        this.#render();
        this.#placeholder.style.opacity ="0.85";
        
      }
    };
    this.#recognize.onclick = () => {
      if (this.paths.length) {
        const figure = JSON.stringify(this.paths);
        const downloadATag = document.createElement("a");
        downloadATag.setAttribute(
          "href",
          "data:text/plain:charset=utf-8" + encodeURIComponent(figure)
        );
        const filename = new Date().getTime() + ".json";
        downloadATag.setAttribute("download", filename);
        document.body.appendChild(downloadATag);
        downloadATag.click();
        document.body.removeChild(downloadATag);
      }
    };
  };
  #getMouse = (evt) => {
    const canvasRect = this.canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - canvasRect.left),
      Math.round(evt.clientY - canvasRect.top),
    ];
  };
  #render = () => {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    draw.paths(this.ctx, this.paths);
    if (this.paths.length > 0) {
      this.#undo.disabled = false;
      this.#reset.disabled = false;
      this.#reset.style.cursor = "pointer";
      this.#undo.style.cursor = "pointer";
      this.#recognize.style.cursor = "pointer";
      this.#recognize.style.pointerEvents="auto";
      this.#undo.style.pointerEvents="auto";
      this.#reset.style.pointerEvents="auto";
    } else {
      this.#undo.disabled = true;
      this.#reset.disabled = true;
      this.#recognize.style.pointerEvents="none";
      this.#undo.style.pointerEvents="none";
      this.#reset.style.pointerEvents="none";
    }
  };
}
export default DrawSense;
