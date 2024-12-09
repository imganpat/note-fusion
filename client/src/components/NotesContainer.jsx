import React from "react";
import { useSelector } from "react-redux";
import Note from "./Note";

const NotesContainer = () => {
  // getting notes from redux store
  const note = useSelector((state) => state.notes.notes);

  return (
    <>
      <div className="flex flex-wrap justify-start gap-4 p-8">
        {/* Checking if the notes are present or not */}
        {note.length <= 0 ? (
          <h1 className="text-2xl text-blue-600">
            Your notes will appear here
          </h1>
        ) : (
          note.map((n) => {
            return <Note key={n.uid} noteData={n} />;
          })
        )}
      </div>
    </>
  );
};

export default NotesContainer;
