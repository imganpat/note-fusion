import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import backendUrl from "../../constants/backend_url";

const URL = `${backendUrl}/api/notes`;

const addNewNote = createAsyncThunk(
    "notes/addNewNote",
    async (note) => {
        try {
            const response = await axios.post(`${URL}/add`, note, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            return response.data;  // returning the response data (newly created note object with uid and other properties) to update the state
        } catch (error) {
            console.error("Error adding new note:", error);
            throw error;
        }
    }
);

const editNote = createAsyncThunk(
    "notes/editNote",
    async (note) => {
        try {
            await axios.put(`${URL}/edit/${note.uid}`, note, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            return note; // returning the new / edited note object to update the state
        } catch (error) {
            console.error("Error editing note:", error);
            throw error;
        }
    }
);

const toggleImportance = createAsyncThunk(
    "notes/toggleImportance",
    async (uid) => {
        try {
            await axios.put(`${URL}/imp/${uid}`, uid, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            return uid; // returning the uid of a note to filter the state and update the is_important property of the note
        } catch (error) {
            console.error("Error in toggling the importance of the note:", error);
            throw error;
        }
    }
);

const toggleCompletion = createAsyncThunk(
    "notes/toggleCompletion",
    async (uid) => {
        try {
            await axios.put(`${URL}/complete/${uid}`, uid, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            return uid;
        } catch (error) {
            console.error("Error in toggling the complition of the note:", error);
            throw error;
        }
    }
);

const deleteNote = createAsyncThunk(
    "notes/deleteNote",
    async (uid) => {
        try {
            await axios.delete(`${URL}/delete/${uid}`, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            return uid; // returning the uid of the deleted note for state update
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    }
);

const getAllNotes = createAsyncThunk(
    "notes/getAllNotes",
    async () => {
        try {
            const response = await axios.get(`${URL}/`, {
                withCredentials: true,
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error in getting all the notes:", error);
            throw error;
        }

    }
);


export {
    addNewNote,
    deleteNote,
    editNote,
    toggleImportance,
    toggleCompletion,
    getAllNotes
}
