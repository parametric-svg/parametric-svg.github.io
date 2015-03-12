import parametricSVG from "parametric-svg";

let logo = document.getElementById("logo");
window.parent.l = logo;
window.parent.p = parametricSVG(logo, {xStretch: -5});
window.parent.ps = parametricSVG;
