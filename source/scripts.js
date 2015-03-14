import parametricSVG from "parametric-svg";


// Cache DOM elements.

let logo = document.getElementById("logo");

let stretchOut = document.getElementById("stretch-out")
let fill = document.getElementById("fill")
let stretchDown = document.getElementById("stretch-down")


// Cache parametricSVG stuff.

let tree = parametricSVG(logo);
let parameters = {};


// Hook up events.

stretchOut.focus();
stretchOut.addEventListener("input", () => {
  parameters.stretchOut = +stretchOut.value;
  parametricSVG(tree, parameters);
  fill.classList.remove("rolled-up");
  });

function fillInput () {
  parameters.fill = fill.value;
  parametricSVG(tree, parameters);
  stretchDown.classList.remove("rolled-up");
  }
fill.addEventListener("input", fillInput);
fill.addEventListener("focus", () => {
  if (!fill.value) {
    fill.value = "#9eab05";
    fill.select()
    }
  })
fill.addEventListener("blur", () => {
  if (!fill.value) {
    fill.value = "#9eab05";
    fillInput();
    }
  })

stretchDown.addEventListener("input", () => {
  parameters.stretchDown = +stretchDown.value;
  parametricSVG(tree, parameters);
  });
