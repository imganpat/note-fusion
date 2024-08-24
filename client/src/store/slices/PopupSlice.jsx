import { createSlice } from "@reduxjs/toolkit";

const PopUpSlice = createSlice({
  name: "popup",
  initialState: {
    isPopupOpen: false,
    isEditing: false,
    currentNote: { uid: null, description: "", is_important: false },
  },
  reducers: {
    openPopUp(state, action) {
      state.isPopupOpen = true;
      state.isEditing = action.payload.isEditing;
      state.currentNote = {
        uid: action.payload.currentNote.uid,
        description: action.payload.currentNote.description,
        is_important: action.payload.currentNote.is_important,
      };
    },
    closePopUp(state) {
      state.isPopupOpen = false;
    },
  },
});

export default PopUpSlice;

export const { openPopUp, closePopUp } = PopUpSlice.actions;
