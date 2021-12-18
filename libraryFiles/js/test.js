/* Usage of js library */
"use strict";
const testNotes = [
  {
    type: "wholeNote",
    positionLeft: "387.547px",
    positionTop: "33.7815px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "wholeNote",
    positionLeft: "488.547px",
    positionTop: "37.7815px",
    staffIndex: 2,
    grandStaffIndex: 0,
  },
  {
    type: "halfNote",
    positionLeft: "616.281px",
    positionTop: "-18.0625px",
    staffIndex: 0,
    grandStaffIndex: 2,
  },
  {
    type: "sixteenthNote",
    positionLeft: "461.047px",
    positionTop: "7.4065px",
    staffIndex: 2,
    grandStaffIndex: 2,
  },
  {
    type: "staffBar",
    positionLeft: "374.547px",
    positionTop: "0.9375px",
    staffIndex: 0,
    grandStaffIndex: 2,
  },
  {
    type: "eighthNote",
    positionLeft: "210px",
    positionTop: "4.9065px",
    staffIndex: 2,
    grandStaffIndex: 2,
  },
  {
    type: "staffBar",
    positionLeft: "575.547px",
    positionTop: "0.9375px",
    staffIndex: 2,
    grandStaffIndex: 2,
  },
  {
    type: "sixteenthNote",
    positionLeft: "617.047px",
    positionTop: "4.4065px",
    staffIndex: 2,
    grandStaffIndex: 0,
  },
  {
    type: "quarterNote",
    positionLeft: "491.094px",
    positionTop: "9.9215px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
];

const sg = SheetGenerator({
  clefs: { treble: true, bass: true },
  timeSignatures: { upper: 2, lower: 4 },
  numStaffs: 2,
  tempo: 120,
  items: testNotes,
});
sg.makeSheet();
sg.enableEditing(true);
const sheetContainer = document.createElement("div");
sheetContainer.style = "width:85%; margin: 10px auto";
sheetContainer.appendChild(sg.mainView);
const body = document.querySelector("body");
body.appendChild(sheetContainer);

const saveButton = document.createElement("button");
saveButton.onclick = sg.saveSheet;
saveButton.innerText = "save";
body.appendChild(saveButton);
