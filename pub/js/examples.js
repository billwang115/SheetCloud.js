/* Usage of js library */
"use strict";
const sg = SheetGenerator({});
sg.makeSheet();
sg.enableEditing(true);
const sheetContainer = document.createElement("div");
sheetContainer.style = "width:85%; margin: 10px auto";
sheetContainer.appendChild(sg.mainView);
const body = document.querySelector("body");
body.appendChild(sheetContainer);
