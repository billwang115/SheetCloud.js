"use strict";

const SheetGenerator = (options) => {
  //variables
  const _self = {}; // object to return
  _self.clefs = {
    // set using function
    treble: false,
    bass: false,
  };

  //functions
  _self.makeSheet = () => {
    _self.clefs = { ..._self.clefs, ...options.clefs };
  };

  return _self;
};
