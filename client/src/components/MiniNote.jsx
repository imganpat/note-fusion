import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { markAnimated } from "../store/slices/notes_slice.js";
import {
  deleteNote,
  toggleImportance,
  toggleCompletion,
} from "../store/thunks/notes_thunk.js";
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
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useInputPopup } from "@/context/InputPopupContext.jsx";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog.jsx";
import ConfirmDialog from "./ConfirmDialog.jsx";

const handleShare = async (uid) => {
  if (navigator.share)
    try {
      await navigator.share({
        url: `${window.location.href}note/${uid}`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  else alert("Sharing is not supported on this browser.");
};

const handleDelete = async (noteRef, dispatch, uid) => {
  gsap.to(noteRef.current, {
    opacity: 0,
    scale: 0.9,
    left: 50,
    display: "none",
    duration: 0.2,
    ease: "power2.out",
    onComplete: async () => {
      await dispatch(deleteNote(uid));
      toggleMenu();
    },
  });
};

const MiniNote = ({ noteData }) => {
  const dispatch = useDispatch();
  const menuBtnRef = useRef();
  const menuRef = useRef();
  const noteRef = useRef(null);
  const utilityBtnRefs = useRef([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const hasAnimated = useSelector((state) => state.notes.hasAnimated);
  const [important, setImportant] = useState(noteData.is_important);
  const formatedDate = new Date(noteData.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  utilityBtnRefs.current = [];

  const { openPopup } = useInputPopup();

  useEffect(() => {
    setImportant(noteData.is_important);
  }, [noteData.is_important]);

  // Function to add elements to the utilityBtnRefs array for animation purposes using menu buttons
  const addToRefs = (el) => {
    if (el && !utilityBtnRefs.current.includes(el)) {
      utilityBtnRefs.current.push(el);
    }
  };

  // Animating the note on load
  useGSAP(() => {
    if (!hasAnimated) {
      gsap.timeline().from(noteRef.current, {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power3.out",
      });
      dispatch(markAnimated());
    }
  });

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

  return (
    <Link to={`/note/${noteData.uid}`} className="block">
      <div
        ref={noteRef}
        id="noteRef"
        className={`note-card relative h-28 w-36 rounded px-2 py-1 text-sm sm:h-36 sm:w-44 md:h-52 md:w-64 md:rounded-xl md:px-5 md:pb-1 md:pt-4 md:text-base ${
          noteData.is_complete
            ? "bg-blue-50 text-gray-400 line-through"
            : "bg-blue-100 text-blue-900"
        }`}
      >
        <div id="note-desc" className="flex h-3/4 flex-col gap-1">
          <h5 className="line-clamp-1 text-lg font-semibold">
            {noteData.title}
          </h5>
          <p className="line-clamp-3 leading-5 sm:line-clamp-4 md:line-clamp-5">
            {noteData.description}
          </p>
        </div>

        {/* Displaying star icon if note is important */}
        {important ? (
          <div className="absolute right-2 top-1 md:right-5 md:top-3">
            <StarIcon />
          </div>
        ) : (
          ""
        )}

        <div className="relative flex h-1/4 w-full items-center justify-between text-sm">
          <div id="creation-date" className="text-xs text-blue-900 sm:text-sm">
            {formatedDate}
          </div>

          {/* Menu button moved to bottom right */}
          <div
            ref={menuBtnRef}
            id="edit-btn"
            className="absolute bottom-2 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-blue-50"
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
                openPopup({
                  mode: "edit",
                  currentNote: {
                    uid: noteData.uid,
                    title: noteData.title,
                    description: noteData.description,
                    is_important: noteData.is_important,
                  },
                });
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
                dispatch(toggleImportance(noteData.uid));
                setImportant((prev) => !prev);
                toggleMenu(e);
              }}
            >
              {!important ? <ImpIcon /> : <DisableImpIcon />}
            </div>

            {/* Toggle completion button */}
            <div
              data-tooltip-id="mark-com-btn"
              ref={addToRefs}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-blue-50"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation
                dispatch(toggleCompletion(noteData.uid));
                toggleMenu(e);
              }}
            >
              {!noteData.is_complete ? <CheckIcon /> : <DisableCheckIcon />}
            </div>

            {/* Delete button */}
            <AlertDialog open={open} onOpenChange={setOpen}>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <AlertDialogTrigger
                  data-tooltip-id="del-btn"
                  ref={addToRefs}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-blue-50"
                  onClick={() => setOpen(true)}
                >
                  <DeleteIcon />
                </AlertDialogTrigger>
              </div>
              <ConfirmDialog
                setOpen={setOpen}
                onConfirm={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpen(false);
                  handleDelete(noteRef, dispatch, noteData.uid);
                }}
              />
            </AlertDialog>

            {/* Share button */}
            <div
              data-tooltip-id="share-btn"
              ref={addToRefs}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-950 text-blue-50"
              onClick={(e) => {
                e.preventDefault();
                handleShare(noteData.uid);
              }}
            >
              <ShareIcon />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MiniNote;
