import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { addNewNote, editNote } from "../store/thunks/notes_thunk.js";
import { closePopUp } from "../store/slices/popup_slice.js";
import CancelIcon from "../../public/assets/svgs/CancelIcon";

const handleAddOrUpdateNote = async (
  dispatch,
  isEditing,
  currentNote,
  title,
  description,
  is_important,
  is_completed,
  username
) => {
  const date = new Date();
  const noteDate = date.toISOString().slice(0, 19).replace("T", " ");

  const note = {
    uid: isEditing ? currentNote.uid : null, // If editing, keep the current uid else set to null
    title, // If editing, keep the current title else set to "New Note"
    description,
    created_at: isEditing ? currentNote.created_at : noteDate, // If editing, keep the current created_at date else set the new date
    is_important,
    is_completed,
    username,
  };

  if (isEditing) await dispatch(editNote(note));
  else await dispatch(addNewNote(note));

  dispatch(closePopUp());
};

const Input = () => {
  const dispatch = useDispatch();

  const popUpRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const { isEditing, currentNote } = useSelector((state) => state.popup); // getting isEditing and currentNote from popup slice

  const [title, setTitle] = useState(
    // setting title to currentNote title if editing else empty string
    currentNote?.title || ""
  );

  const [description, setDescription] = useState(
    // setting description to currentNote description if editing else empty string
    currentNote?.description || ""
  );

  const [is_important, setIsImportant] = useState(
    currentNote?.is_important || false // setting is_important to currentNote is_important if editing else false
  );
  const [is_completed, setIsCompleted] = useState(
    currentNote?.is_completed || false // setting is_completed to currentNote is_completed if editing else false
  );
  const username = localStorage.getItem("username"); // getting username from local storage

  useGSAP(() => {
    // Animating the popup
    gsap.fromTo(
      popUpRef.current,
      { opacity: 0, scale: 0.8 }, // Initial state
      { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" } // Final state
    );
  }, []);

  useEffect(() => {
    if (isEditing) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
      setIsImportant(currentNote.is_important);
    }
    if (descriptionRef.current) {
      descriptionRef.current.focus(); // Focusing on the input field when the popup is opened
      //     // Setting the cursor at the end of the input field when editing
      descriptionRef.current.setSelectionRange(
        descriptionRef.current.value.length,
        descriptionRef.current.value.length
      );
    }
  }, [isEditing, currentNote]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") dispatch(closePopUp());
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  return (
    <div className="absolute left-0 top-0 z-50 flex h-dvh w-screen flex-col items-center justify-center bg-black bg-opacity-70 py-2 sm:py-6 md:py-8 lg:py-8">
      <div
        ref={popUpRef}
        className="fixed top-1/4 flex h-72 max-w-[85%] flex-col items-center justify-between gap-5 rounded-md bg-white p-4 shadow-xl md:min-w-96 lg:max-w-full"
      >
        <button
          onClick={() => dispatch(closePopUp())}
          className="absolute top-4 place-self-end"
        >
          <CancelIcon color="#9ca3af" size="23" />
        </button>

        <div className="flex w-full flex-col items-center justify-center gap-3">
          <div className="flex w-full flex-col items-center justify-center gap-1">
            <input
              type="text"
              ref={titleRef}
              className="flex w-full resize-none px-2 py-1 text-lg font-semibold text-gray-800 outline-none"
              placeholder="New Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="h-[1px] w-full border-b border-gray-300"></div>
            <textarea
              ref={descriptionRef}
              cols="50"
              rows="6"
              className="flex w-full resize-none border-none border-slate-300 px-2 py-1 outline-none"
              placeholder="Enter your note here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex w-full items-center justify-between gap-2">
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
                className="ml-2 cursor-pointer text-sm text-gray-500"
              >
                Mark important
              </label>
            </div>

            <button
              className="relative flex h-11 w-full items-center justify-center rounded bg-gradient-to-tr from-blue-900 to-blue-950 bg-[length:200%_200%] bg-left px-12 py-4 text-blue-50 transition-all duration-500 ease-in-out hover:bg-right"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #172554, #1E40AF, #172554)",
                transition: "background-position 0.3s ease-in-out",
              }}
              onClick={() =>
                handleAddOrUpdateNote(
                  dispatch,
                  isEditing,
                  currentNote,
                  title,
                  description,
                  is_important,
                  is_completed,
                  username
                )
              }
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Input;
