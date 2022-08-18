//Changes pdfjs by removing sdtats in xref.js and changed xrefstats in parser.js

import * as process from "./processor.js";
let currentURL = window.location.href;
let currentstr = currentURL.toString();

let filename = decodeURIComponent(currentstr.slice(currentstr.search("=") + 1));
let file = filename.substring(filename.lastIndexOf("/") + 1);
console.log(file);
let title = document.createElement("title");
title.text = file;
document.head.appendChild(title);

fetch(filename)
  .then((response) => response.arrayBuffer())
  .then(
    function (pdfBuffer) {
      process.processPDF(pdfBuffer);
    },
    function (error) {
      console.log(new Error(error));
    }
  );
