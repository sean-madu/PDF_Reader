import * as process from "./processor.js";

let pdfContent;
let navbar = document.getElementById("navbar");
let sticky = navbar.offsetTop;
window.onscroll = function () {
  if (window.scrollY >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};
let currentURL = window.location.href;
let currentstr = currentURL.toString();

let filename = decodeURIComponent(currentstr.slice(currentstr.search("=") + 1));
let file = filename.substring(filename.lastIndexOf("/") + 1);
let title = document.createElement("title");
let navbarName = document.getElementById("pdf-name");
navbarName.textContent = title.text = file;

document.head.appendChild(title);

fetch(filename)
  .then((response) => response.arrayBuffer())
  .then(
    function (pdfBuffer) {
      pdfContent = pdfBuffer;
      process.processPDF(pdfBuffer);
    },
    function (error) {
      console.log(new Error(error));
    }
  );

let pageScale = document.getElementById("pageScale");
let zoominbutton = document.getElementById("zoom-in");
zoominbutton.onclick = function () {
  process.setScale(process.getScale() + 0.25);
  pageScale.textContent = process.getScale() * 100;

  process.processPDF(pdfContent);
  document.body.removeChild(document.getElementById("pdfDiv"));
};

var zoomoutbutton = document.getElementById("zoom-out");
zoomoutbutton.onclick = function () {
  if (process.getScale() <= 0.25) {
    return;
  }
  process.setScale(process.getScale() - 0.25);
  pageScale.textContent = process.getScale() * 100;
  document.body.removeChild(document.getElementById("pdfDiv"));
  process.processPDF(pdfContent);
};
