"use strict";

const SheetGenerator = (options) => {
  // variables
  const _self = {}; // object to return
  _self.mainView = document.createElement(null);
  _self.clefs = {
    treble: false,
    bass: false,
  };
  _self.timeSignatures = {
    upper: 4, //default
    lower: 4,
  };
  _self.editingEnabled = false;

  //private variables
  let mainSheet = document.createElement(null);
  let notesOptions = [];
  let placedNotes = [];

  // functions
  _self.makeSheet = () => {
    setVariables();

    const staff = setStaffs();
    mainSheet = document.createElement("div");
    mainSheet.className = "sheet";
    mainSheet.appendChild(staff);
    setClefs();

    const sheetContainer = document.createElement("div");
    sheetContainer.className = "sheetContainer";
    sheetContainer.appendChild(mainSheet);

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

  const setStaffs = () => {
    const grandStaff = document.createElement("div");
    grandStaff.className = "grandStaff";
    const staff = document.createElement("div");
    staff.className = "staff";
    const line = document.createElement("hr");
    line.className = "staffLine";
    staff.appendChild(line);
    const space = document.createElement("div");
    space.className = "lineSpace";
    staff.appendChild(space);
    staff.appendChild(line.cloneNode(true));
    staff.appendChild(space.cloneNode(true));
    staff.appendChild(line.cloneNode(true));
    staff.appendChild(space.cloneNode(true));
    staff.appendChild(line.cloneNode(true));
    staff.appendChild(space.cloneNode(true));
    staff.appendChild(line.cloneNode(true));
    grandStaff.appendChild(staff);

    if (_self.clefs.treble && _self.clefs.bass) {
      const lowerStaff = staff.cloneNode(true);
      const staffSpace = document.createElement("div");
      staffSpace.className = "staffSpace";
      grandStaff.appendChild(staffSpace);
      grandStaff.appendChild(lowerStaff);
    }

    return grandStaff;
  };

  const setClefs = () => {
    const grandStaffList = mainSheet.getElementsByClassName("grandStaff");
    Array.from(grandStaffList).forEach((grandStaff) => {
      if (_self.clefs.treble) {
        const upperStaff = grandStaff.childNodes[0];
        const trebleClef = document.createElement("img");
        trebleClef.src = "js/assets/treble_clef.png";
        trebleClef.alt = "Treble-clef";
        trebleClef.draggable = false;
        trebleClef.className = "trebleClef";

        upperStaff.appendChild(trebleClef);
      }

      if (_self.clefs.bass) {
        let staffIndex = _self.clefs.treble ? 2 : 0;
        const lowerStaff = grandStaff.childNodes[staffIndex];
        const bassClef = document.createElement("img");
        bassClef.src = "js/assets/bass_clef.png";
        bassClef.alt = "Bass-clef";
        bassClef.draggable = false;
        bassClef.className = "bassClef";

        lowerStaff.appendChild(bassClef);
      }
    });
  };

  const getNotesListElement = () => {
    const listsContainer = document.createElement("span");
    listsContainer.className = "notesListContainer ";
    const heading = document.createElement("h3");
    heading.innerText = "Music Notes";
    heading.className = "notesListHeading";
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

    notesOptions = iconsArray;

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
    mainSheet !== null && _self.mainView.appendChild(notesElement);
  };

  const enableNotesDragging = () => {
    if (_self.editingEnabled) {
      notesOptions.forEach((element) => {
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
    mainSheet.childNodes.forEach((sheet) => {
      sheet.childNodes.forEach((element) => {
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
            sheet.getBoundingClientRect().y +
              sheet.getBoundingClientRect().height +
              barPadding
        ) {
          placedNotes.push(floatingNote.cloneNode(true));
          sheet.appendChild(floatingNote.cloneNode(true));
          return false;
        }
      });
    });
  };

  return _self;
};
