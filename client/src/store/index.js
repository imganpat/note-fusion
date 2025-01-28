import { configureStore } from "@reduxjs/toolkit";
import NoteSlice from "./slices/notes_slice.js";
import PopUpSlide from "./slices/popup_slice.js";

const store = configureStore({
  reducer: {
    notes: NoteSlice.reducer,
    popup: PopUpSlide.reducer,
  },
});

export default store;
