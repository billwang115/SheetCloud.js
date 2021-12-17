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
  _self.numStaffs = 1;

  //private variables
  let mainSheet = document.createElement(null);
  let notesOptions = [];
  let placedNotes = [];

  // functions
  _self.makeSheet = () => {
    setVariables();

    mainSheet = document.createElement("div");
    mainSheet.className = "sheet";
    for (let i = 0; i < _self.numStaffs; i++) {
      const staff = setStaff();
      mainSheet.appendChild(staff);
      if (i < _self.numStaffs - 1) {
        const sheetSpace = document.createElement("div");
        sheetSpace.className = "sheetSpace";
        mainSheet.appendChild(sheetSpace);
      }
    }

    setClefs();
    setTime();

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
    _self.numStaffs = options.numStaffs ? options.numStaffs : _self.numStaffs;
  };

  const setStaff = () => {
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
    const leftSection = document.createElement("div");
    leftSection.className = "staffLeftSection";
    staff.appendChild(leftSection);
    grandStaff.appendChild(staff);

    if (_self.clefs.treble && _self.clefs.bass) {
      const lowerStaff = staff.cloneNode(true);
      const staffSpace = document.createElement("div");
      staffSpace.className = "staffSpace";
      const leftSection = document.createElement("div");
      leftSection.className = "staffLeftSection";
      staffSpace.appendChild(leftSection);
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

        const leftSection = upperStaff.querySelector(".staffLeftSection");
        leftSection.appendChild(trebleClef);
      }

      if (_self.clefs.bass) {
        let staffIndex = _self.clefs.treble ? 2 : 0;
        const lowerStaff = grandStaff.childNodes[staffIndex];
        const bassClef = document.createElement("img");
        bassClef.src = "js/assets/bass_clef.png";
        bassClef.alt = "Bass-clef";
        bassClef.draggable = false;
        bassClef.className = "bassClef";

        const leftSection = lowerStaff.querySelector(".staffLeftSection");
        leftSection.appendChild(bassClef);
      }
    });
  };

  const setTime = () => {
    const grandStaffList = mainSheet.getElementsByClassName("grandStaff");
    Array.from(grandStaffList).forEach((grandStaff) => {
      const topNumber = document.createElement("img");
      topNumber.src = getTimeImageSource(_self.timeSignatures.upper);
      topNumber.alt = "top-number";
      topNumber.draggable = false;
      topNumber.className = "timeSignatureNumber";

      const bottomNumber = document.createElement("img");
      bottomNumber.src = getTimeImageSource(_self.timeSignatures.lower);
      bottomNumber.alt = "bottom-number";
      bottomNumber.draggable = false;
      bottomNumber.className = "timeSignatureNumber";

      const timeSignatureContainer = document.createElement("div");
      timeSignatureContainer.className = "timeSignatureContainer";
      timeSignatureContainer.appendChild(topNumber);
      timeSignatureContainer.appendChild(bottomNumber);

      const upperStaff = grandStaff.childNodes[0];
      const leftSection = upperStaff.querySelector(".staffLeftSection");
      leftSection.appendChild(timeSignatureContainer);

      if (_self.clefs.bass && _self.clefs.treble) {
        const lowerStaff = grandStaff.childNodes[2];
        const timeSignatureContainer2 = timeSignatureContainer.cloneNode(true);
        const leftSection = lowerStaff.querySelector(".staffLeftSection");
        leftSection.appendChild(timeSignatureContainer2);
      }
    });
  };

  const getTimeImageSource = (timeNumber) => {
    if (timeNumber === 2) {
      return "js/assets/time-2.png";
    } else if (timeNumber === 3) {
      return "js/assets/time-3.png";
    } else if (timeNumber === 4) {
      return "js/assets/time-4.png";
    } else if (timeNumber === 6) {
      return "js/assets/time-6.png";
    } else if (timeNumber === 8) {
      return "js/assets/time-8.png";
    } else if (timeNumber === 9) {
      return "js/assets/time-9.png";
    } else if (timeNumber === 12) {
      return "js/assets/time-12.png";
    } else if (timeNumber === 16) {
      return "js/assets/time-16.png";
    } else {
      return "js/assets/time-4.png";
    }
  };

  const getNotesListElement = () => {
    const listsContainer = document.createElement("div");
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
    icons.halfNoteFlipped = "js/assets/half_note_flipped.png";
    icons.quarterNote = "js/assets/quarter_note.png";
    icons.quarterNoteFlipped = "js/assets/quarter_note_flipped.png";
    icons.eighthNote = "js/assets/eighth_note.png";
    icons.eighthNoteFlipped = "js/assets/eighth_note_flipped.png";
    icons.sixteenthNote = "js/assets/sixteenth_note.png";
    icons.sixteenthNoteFlipped = "js/assets/sixteenth_note_flipped.png";
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

    if (placedNotes.includes(currentImg)) {
      //remove old image if it was already placed on the grid
      placedNotes = placedNotes.filter((note) => note !== currentImg);
      currentImg.parentNode.removeChild(currentImg);
    }

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
    Array.from(mainSheet.childNodes).every((grandStaff) => {
      let foundSpot = false; //bool representing note was found on a position on the sheet
      Array.from(grandStaff.childNodes).every((element) => {
        const staffElementTop = element.getBoundingClientRect().top;
        const leftSection = element.querySelector(".staffLeftSection");
        const leftSectionRight = leftSection.getBoundingClientRect().right;
        const staffElementLeft = element.getBoundingClientRect().left;
        const staffElementWidth = element.getBoundingClientRect().width;
        const staffElementHeight = element.getBoundingClientRect().height;
        const floatingNoteX = floatingNote.getBoundingClientRect().x;
        const floatingNoteY = floatingNote.getBoundingClientRect().y;
        const floatingNoteWidth = floatingNote.getBoundingClientRect().width;
        const floatingNoteHeight = floatingNote.getBoundingClientRect().height;

        const staffPadding = 50;
        if (
          floatingNoteX >= leftSectionRight &&
          floatingNoteY >= staffElementTop - staffPadding &&
          floatingNoteX + floatingNoteWidth <=
            staffElementLeft + staffElementWidth &&
          floatingNoteY + floatingNoteHeight <=
            staffElementTop + staffElementHeight + staffPadding
        ) {
          const newNote = floatingNote.cloneNode(true);
          newNote.style.left =
            parseFloat(floatingNote.style.left) -
            parseFloat(staffElementLeft) +
            "px";
          newNote.style.top =
            parseFloat(floatingNote.style.top) -
            parseFloat(staffElementTop) +
            "px";
          newNote.onmousedown = onMouseDown;
          placedNotes.push(newNote);
          element.appendChild(newNote);
          foundSpot = true;
          return false;
        } else {
          return true;
        }
      });

      return !foundSpot;
    });
  };

  return _self;
};
