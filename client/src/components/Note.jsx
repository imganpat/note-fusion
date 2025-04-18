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

const handelEdit = async (e, note, dispatch) => {
  // wait for 3 seconds which reduces the api calls and updates the note after the user stops typing
  setTimeout(() => {
    note.description = e.target.innerText;
    dispatch(editNote(note));
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
    <div className="absolute left-0 top-0 z-50 flex h-dvh w-screen flex-col items-center justify-center bg-black bg-opacity-50 py-2 sm:py-6 md:py-8 lg:py-8">
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
                <div className="h-5 w-3/5 animate-pulse rounded-full bg-gray-200"></div>
                <div className="h-5 w-full animate-pulse rounded-full bg-gray-200 delay-75"></div>
                <div className="h-5 w-2/3 animate-pulse rounded-full bg-gray-200 delay-100"></div>
                <div className="h-5 w-4/5 animate-pulse rounded-full bg-gray-200 delay-150"></div>
              </>
            ) : (
              <>
                <pre
                  className={`flex-grow text-wrap font-sans outline-none ${complete ? "line-through" : ""}`}
                  contentEditable={isOwner}
                  onInput={(e) => handelEdit(e, note, dispatch)}
                >
                  {note.description}
                </pre>
              </>
            )}

            <span className="mt-10 max-h-fit w-fit self-end text-sm">
              {loading ? (
                <div className="h-5 min-w-[40ch] animate-pulse rounded-full bg-gray-200"></div>
              ) : (
                <p>
                  Created {!isOwner ? note.username : ""} on {note.created_at}
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
