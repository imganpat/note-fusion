import React, { createContext, useContext, useState } from "react";

const InputPopupContext = createContext();

export const useInputPopup = () => useContext(InputPopupContext);

export const InputPopupProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [currentNote, setCurrentNote] = useState(null);

  const openPopup = ({ mode, currentNote }) => {
    setOpen(true);
    setMode(mode);
    setCurrentNote(currentNote);
  };

  const closePopup = () => {
    setOpen(false);
    setMode(null);
    setCurrentNote(null);
  };

  return (
    <InputPopupContext.Provider
      value={{
        open,
        setOpen,
        mode,
        currentNote,
        openPopup,
        closePopup,
      }}
    >
      {children}
    </InputPopupContext.Provider>
  );
};
