import parametricSVG from "parametric-svg";


// Cache DOM elements.

let logo = document.getElementById("logo");

let stretchOut = document.getElementById("stretch-out")
let fill = document.getElementById("fill")
let stretchDown = document.getElementById("stretch-down")


// Cache parametricSVG stuff.

let tree = parametricSVG(logo);
let parameters = {};
function updateSVG () {
  parametricSVG(tree, parameters);
  }

// Hook up events.

let hiddenClass = "rolled-up";

stretchOut.addEventListener("input", () => {
  parameters.stretchOut = +stretchOut.value;
  updateSVG();
  fill.classList.remove(hiddenClass);
  });

function fillInput () {
  parameters.fill = fill.value;
  updateSVG();
  stretchDown.classList.remove(hiddenClass);
  }
function fallbackFillValue () {
  if (!fill.value) fill.value = "#9eab05";
  }
fill.addEventListener("input", fillInput);
fill.addEventListener("focus", () => {
  fallbackFillValue();
  fill.select()
  })
fill.addEventListener("blur", () => {
  fallbackFillValue();
  fillInput();
  })

stretchDown.addEventListener("input", () => {
  parameters.stretchDown = +stretchDown.value;
  updateSVG();
  });


// Set focus.

stretchOut.focus();
