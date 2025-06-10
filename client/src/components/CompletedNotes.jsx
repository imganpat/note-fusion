import React from "react";
import { useSelector } from "react-redux";
import MiniNote from "./MiniNote";

const NotesContainer = () => {
  const isLoading = useSelector((state) => state.notes.isLoading);

  // getting notes from redux store
  const note = useSelector((state) => state.notes.notes);

  return (
    <>
      {isLoading ? (
        <div className="flex h-5/6 w-full flex-col items-center justify-center md:gap-2">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 md:h-12 md:w-12"></div>
          <p className="animate-pulse">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start gap-4 px-4 md:p-8">
          {/* Checking if the notes are present or not */}
          {note.length <= 0 ? (
            <h1 className="text-2xl text-blue-600">
              Your notes will appear here
            </h1>
          ) : (
            note.map((n) => {
              if (n.is_complete) return <MiniNote key={n.uid} noteData={n} />;
            })
          )}
        </div>
      )}
    </>
  );
};

export default NotesContainer;
