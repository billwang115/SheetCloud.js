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

/*Example 1*/
const sgExample1 = SheetGenerator();
sgExample1.makeSheet({
  clefs: {
    treble: true,
    bass: true,
  },
  timeSignatures: {
    upper: 2,
    lower: 4,
  },
  tempo: 110,
  numStaffs: 1,
  items: [],
});
sgExample1.enableEditing(true);
const sheetContainerEx1 = document.createElement("div");
sheetContainerEx1.style = "width:85%; max-width:1300px; margin: 0px auto;";
sheetContainerEx1.appendChild(sgExample1.mainView);

const example1Section = body.querySelector(".example1Section");
example1Section.appendChild(sheetContainerEx1);

const codeUsedSectionStyle =
  "text-align:left; width:85%; max-width:1000px; margin:60px auto 20px auto";
const codeUsedHeaderStyle = "font-size:22px; line-height:26px; margin:0px;";
const codeUsedContainerStyle =
  "display: block;overflow-x: auto;color: #263238;background: #fff;border: solid 1px #e1e4e5;padding: 12px 18px;margin: 24px 0px;";
const codeStyle = "font-size: 16px;line-height: 20px;";

const codeUsedEx1 = document.createElement("div");
codeUsedEx1.style = codeUsedSectionStyle;
const codeUsedEx1Header = document.createElement("h2");
codeUsedEx1Header.style = codeUsedHeaderStyle;
codeUsedEx1Header.innerText = "Code used to generate example";
codeUsedEx1.appendChild(codeUsedEx1Header);

const codeContainerEx1 = document.createElement("div");
codeContainerEx1.style = codeUsedContainerStyle;
const codeEx1 = document.createElement("code");
codeEx1.style = codeStyle;
codeEx1.innerHTML =
  'const sgExample1 = SheetGenerator(); <br/> sgExample1.makeSheet({clefs: {treble: true,bass: true},timeSignatures: {upper: 2,lower: 4,},tempo: 110,numStaffs: 1,items: []}); <br/> sgExample1.enableEditing(true); <br/> const sheetContainerEx1 = document.createElement("div"); <br/> sheetContainerEx1.style = "width:85%; max-width:1300px; margin: 0px auto;"; <br/> sheetContainerEx1.appendChild(sgExample1.mainView);';

codeContainerEx1.appendChild(codeEx1);
codeUsedEx1.appendChild(codeContainerEx1);

example1Section.appendChild(codeUsedEx1);

/*Example 2*/
const testNotes2 = [
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

const sgExample2 = SheetGenerator();
sgExample2.makeSheet({
  clefs: { treble: true, bass: true },
  timeSignatures: { upper: 2, lower: 4 },
  numStaffs: 2,
  tempo: 120,
  items: testNotes2,
});
sgExample2.enableEditing(true);
const sheetContainerEx2 = document.createElement("div");
sheetContainerEx2.style = "width:85%; max-width:1300px; margin: 0px auto;";
sheetContainerEx2.appendChild(sgExample2.mainView);

const example2Section = body.querySelector(".example2Section");
example2Section.appendChild(sheetContainerEx2);

const configurationText = document.createElement("div");
const appendText = (text) => {
  configurationText.innerText = text;
};

const saveButton = document.createElement("button");
saveButton.onclick = () => appendText(JSON.stringify(sgExample2.saveSheet()));
saveButton.innerText = "save";
saveButton.style =
  "text-align:center; margin: auto border: 1px solid #263238;background-color: lightgreen;box-shadow: 0px 1px 4px #263238;color: #263238;border-radius: 16px;font-weight: 600;font-size: 18px;line-height: 24px;padding: 10px 30px;min-width: 190px;cursor: pointer;letter-spacing: 0.15px;color: #263238;";
example2Section.appendChild(saveButton);
example2Section.appendChild(configurationText);
