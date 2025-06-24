import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewNote, editNote } from "../store/thunks/notes_thunk.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog.jsx";
import { Textarea } from "./ui/textarea.jsx";
import { Input } from "./ui/input.jsx";
import { Checkbox } from "./ui/checkbox.jsx";
import { Label } from "./ui/label.jsx";
import { Button } from "./ui/button.jsx";
import { Loader2Icon } from "lucide-react";

const handleAddOrUpdateNote = async (
  setOpen,
  setLoading,
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

  setLoading(true);
  if (isEditing) await dispatch(editNote(note));
  else await dispatch(addNewNote(note));
  setOpen(false);
  setLoading(false);
};

const InputPopup = () => {
  const dispatch = useDispatch();

  const titleRef = useRef();
  const descriptionRef = useRef();

  const { isEditing, currentNote } = useSelector((state) => state.popup); // getting isEditing and currentNote from popup slice

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (isEditing) {
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
  }, [isEditing, currentNote]);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
        Add a Note
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="sr-only">Add a new Note</DialogTitle>
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
                  setOpen,
                  setLoading,
                  dispatch,
                  isEditing,
                  currentNote,
                  title,
                  description,
                  is_important,
                  is_completed,
                  username
                );
              }}
            >
              {loading ? (
                <span className="flex items-center gap-1">
                  {/* display loading spinner along with the operation performed message */}
                  <Loader2Icon className="animate-spin" />
                  {isEditing ? "Editing..." : "Adding..."}
                </span>
              ) : isEditing ? (
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
  );
};

export default InputPopup;
