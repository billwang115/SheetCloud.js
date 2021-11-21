"use strict";

const SheetGenerator = (options) => {
  // variables
  const _self = {}; // object to return
  _self.mainView = document.createElement(null);
  _self.sheet = document.createElement(null);
  _self.clefs = {
    treble: false,
    bass: false,
  };
  _self.timeSignatures = {
    upper: 4, //default
    lower: 4,
  };
  _self.editingEnabled = false;
  _self.notesOptions = [];
  _self.placedNotes = [];

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
    _self.sheet = sheet;

    const sheetContainer = document.createElement("div");
    sheetContainer.className = "sheetContainer";
    sheetContainer.appendChild(sheet);

    _self.mainView = sheetContainer;
  };

  _self.enableEditing = (enabled) => {
    if (enabled) {
      _self.editingEnabled = true;
      makeNotesList();
      enableNotesDragging();
    } else {
      _self.editingEnabled = false;
    }
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
      icon.draggable = false;
      icon.className = "notesListIcon";
      return icon;
    });

    _self.notesOptions = iconsArray;

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

  const makeNotesList = () => {
    const notesElement = getNotesListElement();
    _self.sheet !== null && _self.mainView.appendChild(notesElement);
  };

  const enableNotesDragging = () => {
    if (_self.editingEnabled) {
      _self.notesOptions.forEach((element) => {
        element.onmousedown = onMouseDown;
      });
    }
  };

  const onMouseDown = (event) => {
    // inspired by https://javascript.info/mouse-drag-and-drop
    const currentImg = event.target;
    const floatingImg = currentImg.cloneNode(true);
    floatingImg.style = "position:absolute; z-index: 999;";
    const body = document.querySelector("body");
    body.appendChild(floatingImg);

    const shiftX = event.clientX - currentImg.getBoundingClientRect().left;
    const shiftY = event.clientY - currentImg.getBoundingClientRect().top;
    floatingImg.style.left = event.pageX - shiftX + "px";
    floatingImg.style.top = event.pageY - shiftY + "px";

    const onMouseMove = (event) => {
      floatingImg.style.left = event.pageX - shiftX + "px";
      floatingImg.style.top = event.pageY - shiftY + "px";
    };

    document.addEventListener("mousemove", onMouseMove);

    floatingImg.onmouseup = () => {
      document.removeEventListener("mousemove", onMouseMove);
      floatingImg.onmouseup = null;
      handleNotesDrop(floatingImg);
      body.removeChild(floatingImg);
    };
  };

  const handleNotesDrop = (floatingNote) => {
    _self.sheet.childNodes.forEach((element) => {
      const sheetElementTop = element.getBoundingClientRect().top;
      const sheetElementLeft = element.getBoundingClientRect().left;
      const sheetElementWidth = element.getBoundingClientRect().width;
      const sheetElementHeight = element.getBoundingClientRect().height;
      const floatingNoteX = floatingNote.getBoundingClientRect().x;
      const floatingNoteY = floatingNote.getBoundingClientRect().y;
      const floatingNoteWidth = floatingNote.getBoundingClientRect().width;
      const floatingNoteHeight = floatingNote.getBoundingClientRect().height;

      const barPadding = 50;
      if (
        floatingNoteX >= sheetElementLeft - barPadding &&
        floatingNoteY >= sheetElementTop - barPadding &&
        floatingNoteX + floatingNoteWidth <=
          sheetElementLeft + sheetElementWidth &&
        //floatingNoteY + floatingNoteHeight <= sheetElementTop + sheetElementHeight
        floatingNoteY + floatingNoteHeight <=
          _self.sheet.getBoundingClientRect().y +
            _self.sheet.getBoundingClientRect().height +
            barPadding
      ) {
        placedNotes.push(floatingNote.cloneNode(true));
        _self.sheet.appendChild(floatingNote.cloneNode(true));
        return false;
      }
    });
  };

  return _self;
};
