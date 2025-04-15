import { createSlice } from "@reduxjs/toolkit";
import { addNewNote, deleteNote, editNote, getAllNotes, toggleCompletion, toggleImportance } from "../thunks/notes_thunk";

const initialState = {
  notes: [],
  isPopupOpen: false,
  isEditing: false,
  currentNote: {},
  isLoading: true,
  hasAnimated: false,
};

const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearAllNotes(state) {
      state.notes = [];
    },

    markAnimated: (state) => {
      state.hasAnimated = true;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      // action.payload is the array of notes fetched from the server
      state.notes = action.payload;
    })

    builder.addCase(addNewNote.fulfilled, (state, action) => {
      // action.payload is the note object created in the server
      state.notes.push(action.payload);
    });

    builder.addCase(editNote.fulfilled, (state, action) => {
      // action.payload is the note object with updated values
      const note = state.notes.find((note) => note.uid === action.payload.uid);
      if (note) {
        note.description = action.payload.description;
        note.is_important = action.payload.is_important;
        note.is_complete = action.payload.is_complete;
      }
    });

    builder.addCase(toggleImportance.fulfilled, (state, action) => {
      // action.payload is the uid of the note to be toggled
      const note = state.notes.find((note) => note.uid === action.payload);
      if (note) note.is_important = !note.is_important;
    });

    builder.addCase(toggleCompletion.fulfilled, (state, action) => {
      const note = state.notes.find((note) => note.uid === action.payload);
      if (note) note.is_complete = !note.is_complete;
    });

    builder.addCase(deleteNote.fulfilled, (state, action) => {
      // action.payload is the uid of the note to be deleted
      state.notes = state.notes.filter((note) => note.uid !== action.payload);
    });

  }
});

export default NoteSlice;

export const {
  clearAllNotes,
  markAnimated,
  setLoading
} = NoteSlice.actions;
