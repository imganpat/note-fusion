import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewNote, editNote } from "../store/thunks/notes_thunk.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.jsx";
import { Textarea } from "./ui/textarea.jsx";
import { Input } from "./ui/input.jsx";
import { Checkbox } from "./ui/checkbox.jsx";
import { Label } from "./ui/label.jsx";
import { Button } from "./ui/button.jsx";
import { Loader2Icon, Plus } from "lucide-react";
import { useInputPopup } from "@/context/InputPopupContext.jsx";

const handleAddOrUpdateNote = async (
  setLoading,
  dispatch,
  mode,
  currentNote,
  title,
  description,
  is_important,
  is_completed,
  username,
  closePopup,
  isEditing = mode == "edit" || false
) => {
  const date = new Date();
  const noteDate = date.toISOString().slice(0, 19).replace("T", " ");

  const note = {
    uid: isEditing ? currentNote.uid : null, // If editing, keep the current uid else set to null
    title,
    description,
    created_at: isEditing ? currentNote.created_at : noteDate, // If editing, keep the current created_at date else set the new date
    is_important,
    is_completed,
    username,
  };

  setLoading(true);
  if (isEditing) await dispatch(editNote(note));
  else await dispatch(addNewNote(note));
  setLoading(false);
  closePopup();
};

const InputPopup = () => {
  const dispatch = useDispatch();

  const titleRef = useRef();
  const descriptionRef = useRef();

  const { open, setOpen, mode, openPopup, currentNote, closePopup } =
    useInputPopup(); // getting isEditing and currentNote from popup slice

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [is_important, setIsImportant] = useState(false);
  const [is_completed, setIsCompleted] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (mode === "edit") {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
      setIsImportant(currentNote.is_important);
    }
    if (descriptionRef.current) {
      descriptionRef.current.focus(); // Focusing on the input field when the popup is opened
      // Setting the cursor at the end of the input field when editing
      descriptionRef.current.setSelectionRange(
        descriptionRef.current.value.length,
        descriptionRef.current.value.length
      );
    }
  }, [currentNote]);

  //clearing the previous values when the open state changes
  useEffect(() => {
    return () => {
      setTitle("");
      setDescription("");
      setIsImportant(false);
      setIsCompleted(false);
    };
  }, [open]);

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:static sm:w-full sm:gap-2 sm:whitespace-nowrap sm:rounded-md sm:text-sm sm:font-medium sm:[&_svg]:pointer-events-none sm:[&_svg]:size-4 sm:[&_svg]:shrink-0"
        onClick={() => openPopup({ mode: "add", currentNote: null })}
      >
        <Plus className="size-4 shrink-0" />
        <span className="hidden sm:inline">Add Note</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sr-only">
              {mode === "edit" ? "Edit Note" : "Add Note"}
            </DialogTitle>
            <DialogDescription>
              <Input
                placeholder="New Title"
                className="!focus:outline-none !focus:ring-0 !focus:border-none !border-none px-0 !text-lg font-semibold !outline-none !ring-0"
                ref={titleRef}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                placeholder="Enter your note here"
                className="!focus:outline-none !focus:ring-0 !focus:border-none min-h-40 !border-none px-0 !text-base !outline-none !ring-0"
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <span className="my-4 flex items-center space-x-2">
                <Checkbox
                  id="important"
                  disabled={loading || (!title.trim() && !description.trim())} // Disable checkbot if the on loading and if title and description are empty
                  onChange={() => setIsImportant(!is_important)}
                />
                <Label htmlFor="important" className="cursor-pointer">
                  Mark important
                </Label>
              </span>
              <Button
                className="h-10 w-full px-8"
                disabled={loading || (!title.trim() && !description.trim())} // Disabling the button
                onClick={async () => {
                  await handleAddOrUpdateNote(
                    setLoading,
                    dispatch,
                    mode,
                    currentNote,
                    title,
                    description,
                    is_important,
                    is_completed,
                    username,
                    closePopup
                  );
                }}
              >
                {loading ? (
                  <span className="flex items-center gap-1">
                    {/* display loading spinner along with the operation performed message */}
                    <Loader2Icon className="animate-spin" />
                    {mode === "edit" ? "Updating..." : "Adding..."}
                  </span>
                ) : mode === "edit" ? (
                  // changing the button tect based on the operation
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InputPopup;
