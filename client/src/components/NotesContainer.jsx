import React, { useEffect, useRef, useState } from "react";
import MiniNote from "./MiniNote";
import { useSelector } from "react-redux";
import { gsap } from "gsap";
import Flip from "gsap/Flip";
import { getCookie } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import InputPopup from "./InputPopup";

gsap.registerPlugin(Flip);

const NotesContainer = ({ category }) => {
  //   // getting notes and isLoading from redux store
  const isLoading = useSelector((state) => state.notes.isLoading);
  const notes = useSelector((state) => state.notes.notes);

  const containerRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(
    getCookie("sidebar_state") === "true"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const current = getCookie("sidebar_state") === "true";
      setSidebarOpen((prev) => (prev !== current ? current : prev));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".note-card");
    const state = Flip.getState(cards);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.2,
        ease: "ease",
        stagger: 0.02,
      });
    });
  }, [sidebarOpen]);

  // Filtering Logic
  const getFilteredNotes = () => {
    switch (category) {
      case "important":
        return notes.filter((note) => note.is_important);
      case "completed":
        return notes.filter((note) => note.is_complete);
      case "all":
      default:
        return notes;
    }
  };

  const filteredNotes = getFilteredNotes();
  const isMobile = useIsMobile();

  return (
    <>
      {isLoading ? (
        <div className="flex h-5/6 w-full flex-col items-center justify-center md:gap-2">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 md:h-12 md:w-12"></div>
          <p className="animate-pulse">Loading...</p>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="flex flex-wrap justify-start gap-4 px-4"
        >
          {/* Checking if the notes are present or not */}
          {filteredNotes.length <= 0 ? (
            <h1 className="text-2xl text-blue-600">
              No {category} notes to show
            </h1>
          ) : (
            filteredNotes.map((note) => (
              <MiniNote key={note.uid} noteData={note} />
            ))
          )}
        </div>
      )}
      {isMobile && <InputPopup />}
    </>
  );
};

export default NotesContainer;
