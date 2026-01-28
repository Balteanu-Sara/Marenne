/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { MdModeEdit } from "react-icons/md";
import { useState, useEffect } from "react";
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
  const { userProfile } = useAuthContext();

  const [edit, setEdit] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newGenres, setNewGenres] = useState<string[]>([]);

  const set1 = new Set(newGenres);
  const set2 = new Set(userProfile?.selectedGenres);

  useEffect(() => {
    if (userProfile) {
      setNewUsername(userProfile.username);
      setNewGenres(userProfile.selectedGenres);
    }
  }, [userProfile]);

  console.log("New genres: ", newGenres);
  console.log("User's genres: ", userProfile?.selectedGenres);

  function toggleGenre(genre: string) {
    if (newGenres.includes(genre))
      setNewGenres(newGenres.filter((g) => g !== genre));
    else setNewGenres((prev) => [...prev, genre]);
  }

  function handleChanges() {
    // if(new Set(newGenres).difference(new Set(userProfile?.selectedGenres)) ||
    //       new Set(userProfile?.selectedGenres).difference(new Set(newGenres)) ||
    //       newUsername !== userProfile?.username)
  }

  return (
    <>
      {isProfileOpen && (
        <div className="fixed inset-0 z-5" onClick={toggleProfile} />
      )}
      <div
        className={`bg-green fixed text-[20px] gap-5 p-[30px] left-[15px] top-[130px] flex flex-col justify-center items-center w-[calc(100vw-30px)] h-[calc(100vh-250px)] transition duration-500 
        ${
          isProfileOpen
            ? "z-9 opacity-100 pointer-events-auto"
            : "-z-1 opacity-0 pointer-events-none"
        }`}
      >
        <p className="text-[30px] pb-5">Profile</p>
        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row gap-5">
            <p>Email:</p>
            <p>{userProfile?.email}</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row gap-5">
              <p>Username:</p>
              {!edit ? (
                <p className="w-[60%]">{userProfile?.username}</p>
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
        <button className="text-[30px] underline" onClick={handleChanges}>
          Save edits
        </button>
      </div>
    </>
  );
}
