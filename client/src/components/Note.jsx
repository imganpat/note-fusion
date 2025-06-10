import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import backendUrl from "../constants/backend_url";
import {
  CheckIcon,
  DeleteIcon,
  DisableCheckIcon,
  DisableImpIcon,
  ImpIcon,
  ShareIcon,
  StarIcon,
} from "../../public/assets/svgs/index";
import {
  deleteNote,
  toggleImportance,
  toggleCompletion,
  editNote,
} from "../store/thunks/notes_thunk";

const fetchNote = async (
  uid,
  setNote,
  setImportant,
  setComplete,
  setIsOwner,
  setLoading,
  navigate
) => {
  try {
    setLoading(true);
    const response = await axios.get(`${backendUrl}/api/notes/${uid}`, {
      withCredentials: true,
    });
    setLoading(false);
    setNote(response.data[0]);
    setImportant(response.data[0].is_important); // use to toggle the importance icon in real-time
    setComplete(response.data[0].is_complete); // use to toggle the completion icon in real-time

    // check if the note is created by the current user or not
    if (response.data[0].username !== localStorage.getItem("username"))
      //if yes then set isOwner to true which will enable the edit functionality and delete button
      setIsOwner(false);
  } catch (error) {
    console.error("This note does not exist");
    navigate("/");
  }
};

const handleTitleEdit = async (e, note, dispatch) => {
  setTimeout(() => {
    const updatedNote = { ...note, title: e.target.innerText };
    dispatch(editNote(updatedNote));
  }, 3000);
};

const handleDescEdit = async (e, note, dispatch) => {
  // wait for 3 seconds which reduces the api calls and updates the note after the user stops typing
  setTimeout(() => {
    const updatedNote = { ...note, description: e.target.innerText };
    dispatch(editNote(updatedNote));
  }, 3000);
};

const handleDelete = async (dispatch, uid, navigate) => {
  await dispatch(deleteNote(uid));
  navigate("/");
};

const handleShare = async () => {
  if (navigator.share)
    try {
      await navigator.share({
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  else alert("Sharing is not supported on this browser.");
};

const Note = () => {
  const { uid } = useParams();
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOwner, setIsOwner] = useState(true);
  const [important, setImportant] = useState(false);
  const [complete, setComplete] = useState(false);
  const formatedDate = new Date(note.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNote(
      uid,
      setNote,
      setImportant,
      setComplete,
      setIsOwner,
      setLoading,
      navigate
    );
  }, [uid]);

  return (
    <div className="absolute left-0 top-0 z-50 flex h-dvh w-screen flex-col items-center justify-center bg-black bg-opacity-70 py-2 sm:py-6 md:py-8 lg:py-8">
      <div className="relative flex max-h-fit w-11/12 flex-grow flex-col overflow-y-auto overflow-x-hidden rounded-lg bg-gray-100 shadow lg:w-3/5">
        {important != 0 && (
          <div className="absolute right-2 top-1 z-auto md:right-5 md:top-3">
            <StarIcon />
          </div>
        )}
        <div className="scrollbar flex flex-grow flex-col overflow-y-auto p-4">
          <div className="flex flex-grow flex-col gap-2">
            {loading ? (
              <>
                <div className="h-6 w-full animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-6 w-3/5 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-2"></div>
                <div className="h-4 w-full animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-4 w-2/3 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-4 w-4/5 animate-pulse rounded-full bg-gray-200"></div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-4">
                  <h1
                    className={`flex-grow text-wrap font-sans text-2xl font-semibold text-gray-800 outline-none ${complete ? "line-through opacity-55" : null}`}
                    suppressContentEditableWarning={true}
                    contentEditable={isOwner}
                    onClick={(e) => {
                      if (e.target.innerText === "Untiteled")
                        e.target.innerText = null;
                    }}
                    onInput={(e) => handleTitleEdit(e, note, dispatch)}
                  >
                    {note.title || "Untiteled"}
                  </h1>
                  <pre
                    className={`flex-grow text-wrap font-sans text-gray-700 outline-none ${complete ? "line-through opacity-50" : null}`}
                    suppressContentEditableWarning={true}
                    contentEditable={isOwner}
                    onInput={(e) => handleDescEdit(e, note, dispatch)}
                  >
                    {note.description}
                  </pre>
                </div>
              </>
            )}

            <span className="mt-10 max-h-fit w-fit self-end text-sm">
              {loading ? (
                <div className="h-5 min-w-[40ch] animate-pulse rounded-full bg-gray-200"></div>
              ) : (
                <p className="text-sm text-gray-600">
                  Created {!isOwner ? "by " + note.username : ""} on{" "}
                  {formatedDate}
                </p>
              )}
            </span>
          </div>
        </div>

        {/* note button bar */}
        <div className="sticky bottom-0 flex h-14 w-full items-center border-t p-4">
          <div className="flex w-full justify-between">
            {isOwner ? (
              <>
                <div className="flex">
                  <div
                    data-tooltip-id="mark-imp-btn"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent p-2 hover:border-neutral-500"
                    onClick={() => {
                      dispatch(toggleImportance(note.uid));
                      setImportant((prev) => !prev);
                    }}
                  >
                    {!important ? (
                      <ImpIcon color={"#000"} />
                    ) : (
                      <DisableImpIcon color={"#000"} />
                    )}
                  </div>
                  <div
                    data-tooltip-id="mark-com-btn"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent p-2 hover:border-neutral-500"
                    onClick={() => {
                      dispatch(toggleCompletion(note.uid));
                      setComplete((prev) => !prev);
                    }}
                  >
                    {!complete ? (
                      <CheckIcon color={"#000"} />
                    ) : (
                      <DisableCheckIcon color={"#000"} />
                    )}
                  </div>
                  <div
                    data-tooltip-id="del-btn"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent p-2 hover:border-neutral-500"
                    onClick={() => handleDelete(dispatch, note.uid, navigate)}
                  >
                    <DeleteIcon color={"#000"} />
                  </div>
                  <div
                    data-tooltip-id="share-btn"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-transparent p-2 hover:border-neutral-500"
                    onClick={handleShare}
                  >
                    <ShareIcon color={"#000"} />
                  </div>
                </div>

                {/*Close button  */}

                {/* Is the current user is the creator of the note then display close button else not */}
                <div className="flex items-center">
                  <Link
                    to={"/"}
                    className="rounded border-2 bg-white px-6 py-1 duration-100 hover:bg-gray-100"
                  >
                    Close
                  </Link>
                </div>
              </>
            ) : (
              <>
                <span />
                <Link
                  to={"/get-started"}
                  className="text-blue-600 hover:text-blue-500"
                >
                  Want to create your own note?
                </Link>
                <span />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
