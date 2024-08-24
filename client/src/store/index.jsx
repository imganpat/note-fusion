import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./slices/NotesSlice";
import PopUpSlide from "./slices/PopupSlice";

const store = configureStore({
  reducer: {
    notes: noteSlice.reducer,
    popup: PopUpSlide.reducer,
  },
});

export default store;
