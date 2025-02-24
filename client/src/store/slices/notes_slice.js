import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../../constants/backend_url";

const URL = `${backendUrl}/api/notes`;

const initialState = {
  notes: [],
  isPopupOpen: false,
  isEditing: false,
  currentNote: {},
  hasAnimated: false,
};

const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    initNotes(state, action) {
      state.notes.push(...action.payload);
    },

    clearAllNotes(state) {
      state.notes = [];
    },

    addNewNote(state, action) {
      state.notes.push(action.payload);
      axios.post(`${URL}/add`, action.payload, {
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    },

    toogleImportance({ notes }, action) {
      const note = notes.find((note) => note.uid === action.payload.uid);
      if (note) note.is_important = note.is_important ? 0 : 1; // Coverting True to 1 and false to 0

      axios.put(`${URL}/imp/${action.payload.uid}`, action.payload, {
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    },

    toogleCompletion(state, action) {
      const note = state.notes.find((note) => note.uid === action.payload.uid);
      if (note) note.is_complete = note.is_complete ? 0 : 1; // Coverting True to 1 and false to 0

      axios.put(`${URL}/complete/${action.payload.uid}`, action.payload, {
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    },

    editNote(state, action) {
      const currentUid = action.payload.uid;
      const newDesc = action.payload.description;
      const newImp = action.payload.is_important;
      const username = action.payload.username;

      const note = state.notes.map((eachNote) => {
        if (eachNote.uid === currentUid) {
          eachNote.description = newDesc;
          eachNote.is_important = newImp;
        }
      });

      axios.put(
        `${URL}/edit/${action.payload.uid}`,
        {
          description: newDesc,
          is_important: newImp,
          username: username,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    },

    deleteNote(state, action) {
      state.notes.filter((note) => note.uid !== action.payload.uid);

      axios.delete(`${URL}/delete/${action.payload.uid}`, {
        withCredentials: true,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    },

    markAnimated: (state) => {
      state.hasAnimated = true;
    },
  },
});

export default NoteSlice;

export const {
  initNotes,
  clearAllNotes,
  addNewNote,
  toogleImportance,
  toogleCompletion,
  editNote,
  deleteNote,
  markAnimated
} = NoteSlice.actions;
