/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { MdModeEdit } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { addGenres, updateUsername, removeGenres } from "@/lib/auth";
import { useAuthContext } from "@/context/AuthContext";
import { useStateContext } from "@/context/CurrentStateContext";

const availableGenres: string[] = [
  "Architecture",
  "Art",
  "Children",
  "Culture",
  "Design",
  "Erotic",
  "Fashion",
  "Fiction",
  "Food",
  "History",
  "Illustration",
  "LGBT",
  "Music",
  "Nature",
  "Novelty",
  "Philosophy",
  "Photography",
  "Poetry",
  "Politics",
  "Science",
  "Sport",
  "Technology",
];

export default function Profile() {
  const { isProfileOpen, toggleProfile } = useStateContext();
  const { user, userProfile } = useAuthContext();

  const [edit, setEdit] = useState(false);
  const [newUsername, setNewUsername] = useState(userProfile?.username || "");
  const [newGenres, setNewGenres] = useState<string[]>(
    userProfile?.selectedGenres || [],
  );
  const [message, setMessage] = useState("");
  const [changed, setChanged] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const set1 = new Set(newGenres);
  const set2 = new Set(userProfile?.selectedGenres);

  useEffect(() => {
    if (!userProfile) {
      setNewUsername("");
      setNewGenres([]);
      setChanged(false);
    }

    if (userProfile && isProfileOpen && !changed) {
      setNewUsername(userProfile.username);
      setNewGenres(userProfile.selectedGenres);
    }
  }, [userProfile, isProfileOpen, changed]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function toggleGenre(genre: string) {
    if (newGenres.includes(genre))
      setNewGenres(newGenres.filter((g) => g !== genre));
    else setNewGenres((prev) => [...prev, genre]);
  }

  function handleMessage(newMessage: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setMessage(newMessage);

    timeoutRef.current = setTimeout(() => {
      setMessage("");
    }, 1500);
  }

  async function handleChanges() {
    if (set1.size < 2) {
      handleMessage("At least 2 genres required!");
      return;
    }

    setChanged(true);

    if (
      newUsername === userProfile?.username &&
      set1.difference(set2).size === 0 &&
      set2.difference(set1).size === 0
    )
      return;

    let result1;
    if (newUsername !== userProfile?.username && user) {
      result1 = await updateUsername(user.uid, newUsername);
    }

    let result2;

    if (set1.difference(set2).size > 0 && user) {
      const added: string[] = Array.from(set1.difference(set2));
      result2 = await addGenres(user.uid, added);
    }

    let result3;
    if (set2.difference(set1).size > 0 && user) {
      const removed: string[] = Array.from(set2.difference(set1));
      result3 = await removeGenres(user.uid, removed);
    }

    if (
      (result1 && result1.success === false) ||
      (result2 && result2.success === false) ||
      (result3 && result3.success === false)
    ) {
      handleMessage("Failed to update new user data!");
    }
    setChanged(false);
    handleMessage("User data updated!");
  }

  return (
    <>
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            toggleProfile();
            setMessage("");
          }}
        />
      )}
      <div
        className={`bg-green fixed text-[20px] lg:text-2xl justify-around px-[30px] py-[15px] lg:p-[30px] left-[15px] lg:left-[28%] top-[120px] lg:top-[130px] flex flex-col items-center w-[calc(100vw-30px)] lg:w-[calc(100vw-57%)] min-h-55 lg:h-[65vh] lg:max-h-[600px] transition duration-500 
        ${
          isProfileOpen
            ? "z-9 opacity-100 pointer-events-auto"
            : "-z-1 opacity-0 pointer-events-none"
        }`}
      >
        <p className="text-[30px] lg:text-4xl">Profile</p>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row gap-5">
            <p>Email:</p>
            <p>{userProfile?.email}</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-5">
              <p>Username:</p>
              {!edit ? (
                <p className="w-[60%]">{newUsername}</p>
              ) : (
                <input
                  autoFocus={edit}
                  className="w-[60%] outline-none"
                  type="text"
                  placeholder={newUsername}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEdit((prev) => !prev);
                  }}
                />
              )}
            </div>
            <button onClick={() => setEdit((prev) => !prev)}>
              <MdModeEdit />
            </button>
          </div>
          <div className="flex flex-col justify-between">
            <p>Genres: </p>
            <div className="flex flex-wrap justify-center font-garamond text-xl">
              {availableGenres.map((genre, index) => {
                return (
                  <button
                    key={genre + index}
                    type="button"
                    className={`px-3 py-1 transition-all duration-300 ${newGenres.includes(genre) ? "text-white" : "text-black hover:text-grey-1"}`}
                    onClick={() => {
                      toggleGenre(genre);
                    }}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <button className="text-[30px] underline" onClick={handleChanges}>
            Save edits
          </button>
          <p className="text-lg font-courier h-5">{message}</p>
        </div>
      </div>
    </>
  );
}
