/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { MdModeEdit } from "react-icons/md";
import { useState, useEffect } from "react";
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

  const set1 = new Set(newGenres);
  const set2 = new Set(userProfile?.selectedGenres);

  useEffect(() => {
    if (userProfile && !changed) {
      setNewUsername(userProfile.username);
      setNewGenres(userProfile.selectedGenres);
      setChanged(true);
    }
  }, [userProfile]);

  console.log("New genres: ", newGenres);
  console.log("User's genres: ", userProfile?.selectedGenres);
  console.log("Message: ", message);

  function toggleGenre(genre: string) {
    if (newGenres.includes(genre))
      setNewGenres(newGenres.filter((g) => g !== genre));
    else setNewGenres((prev) => [...prev, genre]);
  }

  async function handleChanges() {
    if (set1.size < 2) {
      setMessage("At least 2 genres required!");
      return;
    }

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
      setMessage("Failed to update new user data!");
    }

    setMessage("User data updated!");
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
        className={`bg-green fixed text-[20px] gap-5 p-[30px] left-[15px] top-[130px] flex flex-col justify-center items-center w-[calc(100vw-30px)] h-[calc(100vh-250px)] transition duration-500 
        ${
          isProfileOpen
            ? "z-9 opacity-100 pointer-events-auto"
            : "-z-1 opacity-0 pointer-events-none"
        }`}
      >
        <p className="text-[30px]">Profile</p>
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
          <div className="flex flex-col gap-3">
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
        <div className="flex flex-col gap-2">
          <button className="text-[30px] underline" onClick={handleChanges}>
            Save edits
          </button>
          <p className="text-lg font-courier h-5">{message}</p>
        </div>
      </div>
    </>
  );
}
