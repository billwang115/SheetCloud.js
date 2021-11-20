/* Usage of js library */
"use strict";
const sg = SheetGenerator({});
sg.makeSheet();
const sheetContainer = document.createElement("div");
sheetContainer.style = "width:85%; margin: 10px auto";
sheetContainer.appendChild(sg.sheet);
const body = document.querySelector("body");
body.appendChild(sheetContainer);
