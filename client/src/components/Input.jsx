import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { nanoid } from "@reduxjs/toolkit";
import { addNewNote, editNote } from "../store/slices/NotesSlice.jsx";
import { closePopUp } from "../store/slices/PopupSlice.jsx";
import CancelIcon from "../../public/assets/svgs/CancelIcon.jsx";

const user = localStorage.getItem("username"); // getting username from local storage

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Input = () => {
  const dispatch = useDispatch();

  const popUpRef = useRef();
  const inputRef = useRef();

  const { isEditing, currentNote } = useSelector((state) => state.popup); // getting isEditing and currentNote from popup slice

  const [uid, setUid] = useState(isEditing ? currentNote.uid : nanoid()); //generating unique id for note if not editing else using the currentNote uid
  const [description, setDescription] = useState(
    // setting description to currentNote description if editing else empty string
    currentNote?.description || ""
  );
  const [created_at, setCreated_at] = useState(currentNote?.created_at || ""); // setting created_at to currentNote created_at if editing else empty string
  const [is_important, setIsImportant] = useState(
    currentNote?.is_important || false // setting is_important to currentNote is_important if editing else false
  );
  const [is_completed, setIsCompleted] = useState(
    currentNote?.is_completed || false // setting is_completed to currentNote is_completed if editing else false
  );
  const [username, setUsername] = useState(user); // setting username to user

  useGSAP(() => {
    // Animating the popup
    gsap.fromTo(
      popUpRef.current,
      { opacity: 0, scale: 0.8 }, // Initial state
      { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" } // Final state
    );
  }, [dispatch]);

  useEffect(() => {
    if (isEditing) {
      setUid(currentNote.uid); // Ensure uid remains unchanged
      setDescription(currentNote.description);
      setIsImportant(currentNote.is_important);
    }
    inputRef.current.focus(); // Focusing on the input field when the popup is opened
    // Setting the cursor at the end of the input field when editing
    inputRef.current.setSelectionRange(
      inputRef.current.value.length,
      inputRef.current.value.length
    );
  }, [isEditing, currentNote]);

  const handleAddOrUpdateNote = () => {
    const date = new Date();
    const monthName = months[date.getMonth()]; // Getting the month name from the months array using the month index like 0 for Jan, 1 for Feb, etc.
    const noteDate = `${monthName} ${date.getDate()}, ${date.getFullYear()}`; // Creating the date in the format like Jan 1, 2022

    const note = {
      uid,
      description,
      created_at: isEditing ? currentNote.created_at : noteDate, // If editing, keep the current created_at date else set the new date
      is_important,
      is_completed,
      username,
    };

    if (isEditing) {
      dispatch(editNote(note));
    } else {
      dispatch(addNewNote(note));
    }

    dispatch(closePopUp());
  };

  return (
    <div className="flex items-center justify-center overflow-hidden rounded-lg">
      <div
        ref={popUpRef}
        className="fixed top-1/4 flex h-80 max-w-[85%] flex-col items-center justify-center gap-5 rounded-md bg-white px-5 shadow-xl md:min-w-96 lg:max-w-full"
      >
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-semibold text-gray-700">
            {/* If editing, show "Update" else show "Add" to the popup title*/}
            {isEditing ? "Update" : "Add"} a note
          </span>

          <button
            onClick={() => dispatch(closePopUp())}
            className="place-self-end"
          >
            <CancelIcon color="black" size="23" />
          </button>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-3">
          <textarea
            ref={inputRef}
            cols="50"
            rows="5"
            className="flex w-full resize-none border-2 border-slate-300 px-2 py-1"
            placeholder="Enter your note here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {/* Mark Important option */}
          <div className="my-2 flex w-full items-center">
            <input
              id="is-important"
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded"
              checked={is_important}
              onChange={() => setIsImportant(!is_important)}
            />
            <label
              htmlFor="is-important"
              className="ml-2 cursor-pointer text-sm font-medium text-gray-700"
            >
              Mark important
            </label>
          </div>

          <button
            className="flex h-10 items-center justify-center bg-blue-500 px-12 py-4 text-blue-50"
            onClick={handleAddOrUpdateNote}
          >
            {/* If editing, show "Update" else show "Add" to the button */}
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
