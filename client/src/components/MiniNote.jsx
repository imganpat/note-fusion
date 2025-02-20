import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  toogleImportance,
  toogleCompletion,
  deleteNote,
} from "../store/slices/notes_slice.js";
import {
  MenuIcon,
  CancelIcon,
  EditIcon,
  ImpIcon,
  DisableImpIcon,
  CheckIcon,
  DisableCheckIcon,
  DeleteIcon,
  StarIcon,
  ShareIcon,
} from "../../public/assets/svgs/index.jsx";
import { openPopUp } from "../store/slices/popup_slice.js";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Note = ({ noteData }) => {
  const dispatch = useDispatch();
  const menuBtnRef = useRef();
  const menuRef = useRef();
  const noteRef = useRef(null);
  const utilityBtnRefs = useRef([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  utilityBtnRefs.current = [];

  // Function to add elements to the utilityBtnRefs array for animation purposes using menu buttons
  const addToRefs = (el) => {
    if (el && !utilityBtnRefs.current.includes(el)) {
      utilityBtnRefs.current.push(el);
    }
  };

  // Animating the note on load
  useGSAP(() => {
    gsap.timeline().from(noteRef.current, {
      duration: 1,
      opacity: 0,
      y: 50,
      ease: "power3.out",
    });
  }, []);

  // Function to animate the menu buttons on toggle
  const toggleAnimation = () => {
    if (!menuRef.current.classList.contains("hidden")) {
      gsap.from(utilityBtnRefs.current, {
        duration: 0.5,
        opacity: 0,
        x: 20,
        stagger: 0.03,
        ease: "elastic",
        clear: "opacity, x",
      });
    }
  };

  // Function to toggle the menu
  const toggleMenu = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the menu button
    menuRef.current.classList.toggle("hidden");
    setIsMenuOpen(!isMenuOpen);
    toggleAnimation();
  };

  const handleShare = async (e, uid) => {
    e.preventDefault();
    if (navigator.share)
      try {
        await navigator.share({
          url: `${window.location.href + "note/" + uid}`, // adding the note/note_id in the url.
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    else alert("Sharing is not supported on this browser.");
  };

  return (
    <Link to={`/note/${noteData.uid}`} className="block">
      <div
        ref={noteRef}
        id="noteRef"
        className={`relative h-28 w-36 rounded px-2 py-1 text-sm sm:h-36 sm:w-44 md:h-52 md:w-64 md:rounded-xl md:px-5 md:pb-1 md:pt-4 md:text-base ${
          noteData.is_complete ? "bg-blue-50 line-through" : "bg-blue-100"
        }`}
      >
        <div id="note-desc" className="h-3/4 text-blue-900">
          <p className="md:line-clamp-5">{noteData.description}</p>
        </div>

        {/* Displaying star icon if note is important */}
        {noteData.is_important != 0 && (
          <div className="absolute right-2 top-1 md:right-5 md:top-3">
            <StarIcon />
          </div>
        )}

        <div className="relative flex h-1/4 w-full items-center justify-between text-sm">
          <div id="creation-date" className="text-blue-900">
            {noteData.created_at}
          </div>

          {/* Menu button moved to bottom right */}
          <div
            ref={menuBtnRef}
            id="edit-btn"
            className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-blue-50"
            onClick={toggleMenu}
          >
            {/* Toggle between menu and cancel icon */}
            {!isMenuOpen ? <MenuIcon /> : <CancelIcon />}
          </div>

          {/* Hidden menu container */}
          <div
            ref={menuRef}
            className="absolute bottom-2 right-11 flex hidden h-20 w-20 flex-wrap justify-end gap-1 md:h-fit md:w-fit md:flex-nowrap"
          >
            {/* Edit button */}
            <div
              data-tooltip-id="edit-btn"
              ref={addToRefs}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-blue-50"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                dispatch(
                  openPopUp({
                    isEditing: true,
                    currentNote: {
                      uid: noteData.uid,
                      description: noteData.description,
                      is_important: noteData.is_important,
                    },
                  })
                );
                toggleMenu(e);
              }}
            >
              <EditIcon />
            </div>

            {/* Toggle importance button */}
            <div
              data-tooltip-id="mark-imp-btn"
              ref={addToRefs}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-blue-50"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                dispatch(toogleImportance(noteData));
                toggleMenu(e);
              }}
            >
              {!noteData.is_important ? <ImpIcon /> : <DisableImpIcon />}
            </div>

            {/* Toggle completion button */}
            <div
              data-tooltip-id="mark-com-btn"
              ref={addToRefs}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-blue-50"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                dispatch(toogleCompletion(noteData));
                toggleMenu(e);
              }}
            >
              {!noteData.is_complete ? <CheckIcon /> : <DisableCheckIcon />}
            </div>

            {/* Delete button */}
            <div
              data-tooltip-id="del-btn"
              ref={addToRefs}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-blue-50"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                gsap.to(noteRef.current, {
                  opacity: 0,
                  scale: 0.9,
                  left: 50,
                  duration: 0.3,
                  display: "none",
                  onComplete: () => {
                    dispatch(deleteNote(noteData));
                    toggleMenu(e);
                  },
                });
              }}
            >
              <DeleteIcon />
            </div>

            {/* Share button */}
            <div
              data-tooltip-id="share-btn"
              ref={addToRefs}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-blue-50"
              onClick={(e) => handleShare(e, noteData.uid)}
            >
              <ShareIcon />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Note;
