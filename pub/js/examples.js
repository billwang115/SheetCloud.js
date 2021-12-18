/* Usage of js library */
"use strict";

const body = document.querySelector("body");

/* intro example */
const testNotes1 = [
  {
    type: "eighthNote",
    positionLeft: "349.672px",
    positionTop: "5.9063px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "eighthNote",
    positionLeft: "914.673px",
    positionTop: "28.9065px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "quarterNote",
    positionLeft: "848.753px",
    positionTop: "23.9065px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "eighthNote",
    positionLeft: "783.672px",
    positionTop: "15.9065px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "quarterNote",
    positionLeft: "715.75px",
    positionTop: "32.9065px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "quarterNote",
    positionLeft: "715.75px",
    positionTop: "4.9219px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "staffBar",
    positionLeft: "645.797px",
    positionTop: "-0.0625px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "eighthNote",
    positionLeft: "608.672px",
    positionTop: "34.9065px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "quarterNote",
    positionLeft: "555.75px",
    positionTop: "34.9065px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "eighthNote",
    positionLeft: "499.672px",
    positionTop: "21.9065px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "quarterNote",
    positionLeft: "442.75px",
    positionTop: "21.9065px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "staffBar",
    positionLeft: "381.797px",
    positionTop: "-1.0625px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "quarterNote",
    positionLeft: "289.75px",
    positionTop: "4.9219px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "eighthNoteFlipped",
    positionLeft: "223.344px",
    positionTop: "17.8755px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
  {
    type: "quarterNoteFlipped",
    positionLeft: "173.422px",
    positionTop: "17.9065px",
    staffIndex: 0,
    grandStaffIndex: 0,
  },
];

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
  items: testNotes1,
});
const sheetContainer = document.createElement("div");
sheetContainer.style = "width:85%; max-width:1140px; margin: 75px auto;";
sheetContainer.appendChild(sg.mainView);

const introSection = body.querySelector(".introSection");
introSection.appendChild(sheetContainer);
