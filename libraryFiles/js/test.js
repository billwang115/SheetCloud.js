/* Usage of js library */
"use strict";
const sg = SheetGenerator({
  clefs: { treble: true, bass: true },
  timeSignatures: { upper: 2, lower: 4 },
  numStaffs: 2,
});
sg.makeSheet();
sg.enableEditing(true);
const sheetContainer = document.createElement("div");
sheetContainer.style = "width:85%; margin: 10px auto";
sheetContainer.appendChild(sg.mainView);
const body = document.querySelector("body");
body.appendChild(sheetContainer);
