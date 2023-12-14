export const draw = {};
draw.path = (ctx, path, color = "black") => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(...path[0]);
  for (let i = 0; i < path.length; i++) {
    ctx.lineTo(...path[i]);
  }
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
};
draw.paths = (ctx, paths, color = "black") => {
  for (let i = 0; i < paths.length; i++) {
    draw.path(ctx, paths[i], color);
  }
};
