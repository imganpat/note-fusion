import React from "react";
import { useSelector } from "react-redux";
import Note from "./Note";

const NotesContainer = () => {
  // getting notes from redux store
  const note = useSelector((state) => state.notes.notes);

  return (
    <>
      <div className="max-w-screen mt-20 grid grid-cols-2 place-items-center gap-4 py-5 md:grid-cols-3 md:gap-8 md:px-5 lg:grid-cols-5">
        {/* Checking if the notes are present or not */}
        {note.length <= 0 ? (
          <h1 className="col-span-5 text-2xl text-blue-600">
            Your notes will appear here
          </h1>
        ) : (
          note.map((n) => {
            if (n.is_complete) return <Note key={n.uid} noteData={n} />;
          })
        )}
      </div>
    </>
  );
};

export default NotesContainer;
