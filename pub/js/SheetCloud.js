"use strict";

const SheetGenerator = (options) => {
  // variables
  const _self = {}; // object to return
  _self.sheet = document.createElement(null);
  _self.clefs = {
    treble: false,
    bass: false,
  };
  _self.timeSignatures = {
    upper: 4, //default
    lower: 4,
  };

  // functions
  _self.makeSheet = () => {
    setVariables();

    const sheet = document.createElement("div");
    sheet.className = "sheet";
    const line = document.createElement("hr");
    line.className = "line";
    sheet.appendChild(line);
    const space = document.createElement("div");
    space.className = "space";
    sheet.appendChild(space);
    sheet.appendChild(line.cloneNode(true));
    sheet.appendChild(space.cloneNode(true));
    sheet.appendChild(line.cloneNode(true));
    sheet.appendChild(space.cloneNode(true));
    sheet.appendChild(line.cloneNode(true));
    sheet.appendChild(space.cloneNode(true));
    sheet.appendChild(line.cloneNode(true));

    const sheetContainer = document.createElement("div");
    sheetContainer.className = "sheetContainer";
    sheetContainer.appendChild(sheet);
    const notesElement = getNotesListElement();
    sheetContainer.appendChild(notesElement);

    _self.sheet = sheetContainer;
  };

  // private functions
  const setVariables = () => {
    _self.clefs = { ..._self.clefs, ...options.clefs };
    _self.timeSignatures = {
      ..._self.timeSignatures,
      ...options.timeSignatures,
    };
  };

  const getNotesListElement = () => {
    const listsContainer = document.createElement("span");
    listsContainer.className = "notesListContainer ";
    const heading = document.createElement("h3");
    heading.innerText = "Music Notes";
    listsContainer.appendChild(heading);

    const listsElement = document.createElement("div");
    listsElement.className = "notesList";
    listsContainer.appendChild(listsElement);

    return listsContainer;
  };

  return _self;
};
