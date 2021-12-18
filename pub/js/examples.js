/* Usage of js library */
"use strict";

const body = document.querySelector("body");

/* first example */
const sg = SheetGenerator();
sg.makeSheet({
  clefs: {
    treble: true,
    bass: false,
  },
  timeSignatures: {
    upper: 2,
    lower: 4,
  },
  numStaffs: 1,
});
const sheetContainer = document.createElement("div");
sheetContainer.style = "width:85%; max-width:1150px; margin: 75px auto;";
sheetContainer.appendChild(sg.mainView);

const introSection = body.querySelector(".introSection");
introSection.appendChild(sheetContainer);
