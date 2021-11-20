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

    _self.sheet = sheetContainer;
  };

  _self.makeNotesList = () => {
    const notesElement = getNotesListElement();
    _self.sheet !== null && _self.sheet.appendChild(notesElement);
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

    const list = generateNotesListsIcons(loadListsIcons());
    list.forEach((element) => {
      listsElement.appendChild(element);
    });

    return listsContainer;
  };

  const loadListsIcons = () => {
    let icons = {};
    icons.wholeNote = "js/assets/whole_note.png";
    icons.halfNote = "js/assets/half_note.png";
    icons.quarterNote = "js/assets/quarter_note.png";
    icons.eighthNote = "js/assets/eighth_note.png";
    icons.sixteenthNote = "js/assets/sixteenth_note.png";
    return icons;
  };

  const generateNotesListsIcons = (icons) => {
    let iconsArray = Object.entries(icons).map(([key, value]) => {
      const icon = document.createElement("img");
      icon.src = value;
      icon.alt = key;
      icon.draggable = true;
      icon.className = "notesListIcon";
      return icon;
    });

    let iconsContainerArray = iconsArray.map((element) => {
      const rowItem = document.createElement("div");
      rowItem.className = "notesListRowItem";
      rowItem.appendChild(element);
      return rowItem;
    });

    let listRows = iconsContainerArray.map((element, index) => {
      if (index % 2 === 0) {
        const row = document.createElement("div");
        row.className = "notesListRow";
        row.appendChild(element);
        index < iconsContainerArray.length - 1 &&
          row.appendChild(iconsContainerArray[index + 1]);
        return row;
      }
    });

    listRows = listRows.filter((element) => element !== undefined);

    return listRows;
  };

  return _self;
};
