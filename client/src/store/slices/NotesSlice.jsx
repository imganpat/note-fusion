import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../../constants/backend_url";

const URL = backendUrl;

const initialState = {
  notes: [],
  isPopupOpen: false,
  isEditing: false,
  currentNote: {},
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initNotes(state, action) {
      state.notes.push(...action.payload);
    },

    addNewNote(state, action) {
      state.notes.push(action.payload);
      axios.post(`${URL}/add`, action.payload);
    },

    markImp({ notes }, action) {
      const note = notes.find((note) => note.uid === action.payload.uid);
      if (note) {
        note.is_important = 1;
      }

      axios.put(`${URL}/imp/${action.payload.uid}`);
    },

    markComplete(state, action) {
      const note = state.notes.find((note) => {
        return note.uid === action.payload.uid;
      });
      note.is_complete = 1;
      axios.put(`${URL}/complete/${action.payload.uid}`);
    },

    editNote(state, action) {
      const currentUid = action.payload.currentNote.uid;
      const newDesc = action.payload.description;
      const newImp = action.payload.is_important;

      const note = state.notes.map((eachNote) => {
        if (eachNote.uid === currentUid) {
          eachNote.description = newDesc;
          eachNote.is_important = newImp;
        }
      });

      axios.put(`${URL}/edit/${action.payload.uid}`, {
        uid: currentUid,
        description: newDesc,
        is_important: newImp,
      });
    },

    deleteNote(state, action) {
      axios.delete(`${URL}/delete/${action.payload}`);
      state.notes.filter((note) => note.uid !== action.payload);
    },
  },
});

export default noteSlice;

export const {
  initNotes,
  addNewNote,
  markImp,
  markComplete,
  editNote,
  deleteNote,
} = noteSlice.actions;
