import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewNote, editNote } from "../store/slices/NotesSlice.jsx";
import { nanoid } from "@reduxjs/toolkit";
import { closePopUp } from "../store/slices/PopupSlice.jsx";
import { useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import CancelIcon from "../../public/assets/svgs/CancelIcon.jsx";

const Input = () => {
  const { isEditing, currentNote } = useSelector((state) => state.popup);

  const dispatch = useDispatch();

  const popUpRef = useRef();
  const inputRef = useRef();

  useGSAP(() => {
    gsap.fromTo(
      popUpRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }
    );
  }, [dispatch]);

  const [uid, setUid] = useState("");
  const [description, setDescription] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [is_important, setIsImportant] = useState(false);
  const [is_completed, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setDescription(currentNote.description);
      setIsImportant(currentNote.is_important);
    }
    inputRef.current.focus();
  }, [isEditing, currentNote]);

  useEffect(() => {});

  const note = {
    uid,
    description,
    created_at,
    is_important,
    is_completed,
  };

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

  return (
    <>
      <div className="flex items-center justify-center overflow-hidden rounded-lg">
        <div
          ref={popUpRef}
          className="fixed top-1/4 flex h-80 max-w-[85%] flex-col items-center justify-center gap-5 rounded-md bg-white px-5 shadow-xl md:min-w-96 lg:max-w-full"
        >
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold text-gray-700">
              {" "}
              {isEditing ? "Update" : "Add"} a note{" "}
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
              type="text"
              autoFocus
              placeholder="Enter your note here"
              value={description}
              onChange={(e) => {
                setUid(nanoid());
                setDescription(e.target.value);
                const date = new Date();
                const monthName = months[date.getMonth()];
                setCreated_at(
                  `${monthName} ${date.getDate()}, ${date.getFullYear()}`
                );
              }}
            ></textarea>

            <div className="my-2 flex w-full items-center">
              <input
                id="is-important"
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded"
                checked={is_important}
                value={is_important}
                onChange={() => {
                  setIsImportant(!is_important);
                }}
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
              onClick={() => {
                if (isEditing)
                  dispatch(
                    editNote({ currentNote, description, is_important })
                  );
                else dispatch(addNewNote(note));
                dispatch(closePopUp());
              }}
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Input;
