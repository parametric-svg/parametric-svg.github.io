import parametricSVG from "parametric-svg";


// Cache DOM elements.

let logo = document.getElementById("logo");

let controls =
  { stretchOut: document.getElementById("stretch-out")
  , fill: document.getElementById("fill")
  , stretchDown: document.getElementById("stretch-down")
  };


// Cache parametricSVG stuff.

let tree = parametricSVG(logo);
let parameters = {};


// Hook up events.

controls.stretchOut.addEventListener("input", () => {
  parameters.stretchOut = +controls.stretchOut.value;
  parametricSVG(tree, parameters);
  controls.fill.classList.remove("rolled-up");
  });

controls.fill.addEventListener("input", () => {
  parameters.fill = controls.fill.value;
  parametricSVG(tree, parameters);
  controls.stretchDown.classList.remove("rolled-up");
  });

controls.stretchDown.addEventListener("input", () => {
  parameters.stretchDown = +controls.stretchDown.value;
  parametricSVG(tree, parameters);
  });
