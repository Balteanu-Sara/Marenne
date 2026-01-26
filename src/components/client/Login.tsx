"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { register, login, addGenres } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";

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

export default function Login() {
  const { isLoginOpen, toggleLogin } = useStateContext();
  const { user } = useAuthContext();
  const [hasAccount, setHasAccount] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>("");
  const [menu, setMenu] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);
  const router = useRouter();

  console.log("message: ", message);

  function resetStates() {
    setUsername("");
    setEmail("");
    setPassword("");
    setMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hasAccount) {
      if (!email || !password) {
        setMessage("All fields are necessary to fill!");
        return;
      }

      const result = await login(email, password);
      if (result.success) {
        toggleLogin();
        setHasAccount(true);
        resetStates();
        router.push("/");
      } else setMessage(result.error.message);
    } else {
      if (!email || !password || !username) {
        setMessage("All fields are necessary to fill!");
        return;
      }

      const result = await register(email, username, password);
      if (result.success) {
        setMenu((prev) => !prev);
        resetStates();
      } else setMessage(result.error.message);
    }
  }

  async function handleGenres(e: React.FormEvent) {
    e.preventDefault();
    if (genres.length === 0) {
      setMessage("Genre selection is required!");
      return;
    }

    if (!user) {
      setMessage("User not found. Please try again.");
      return;
    }
    const result = await addGenres(user.uid, genres);
    if (result && result.success) {
      toggleLogin();
      setHasAccount(true);
      setMenu(false);
      setGenres([]);
      router.push("/");
    } else setMessage("Failed to add genres!");
  }

  function toggleGenre(genre: string) {
    if (genres.includes(genre)) setGenres(genres.filter((g) => g !== genre));
    else setGenres((prev) => [...prev, genre]);
  }

  return (
    <>
      {isLoginOpen && (
        <div className="fixed inset-0 z-5" onClick={toggleLogin} />
      )}
      {!menu && (
        <form
          onSubmit={handleSubmit}
          className={`bg-red p-[40px] flex flex-col justify-center items-center gap-10 fixed left-[15px] w-[calc(100vw-30px)] top-[20%] transition duration-300 
      ${
        isLoginOpen
          ? "z-9 opacity-100 pointer-events-auto"
          : "-z-1 opacity-0 pointer-events-none"
      }`}
        >
          <p className="font-garmond text-4xl text-black">
            {hasAccount ? "Login" : "Register"}
          </p>
          {!hasAccount && (
            <div className="w-[80%] border-b-white border-b-[2px]">
              <input
                type="text"
                placeholder={
                  hasAccount ? "Type in your username" : "Type in an username"
                }
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-black font-garamond outline-none w-[100%] text-center text-2xl"
              />
            </div>
          )}
          <div className="w-[80%] border-b-white border-b-[2px]">
            <input
              type="text"
              placeholder="Type in an email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black font-garamond outline-none w-[100%] text-center text-2xl"
            />
          </div>
          <div className="w-[80%] border-b-white border-b-[2px]">
            <input
              type="text"
              placeholder="Type in your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-black font-garamond outline-none w-[100%] text-center text-2xl"
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-[100%] rounded h-15 text-center bg-black text-white text-2xl"
            >
              {hasAccount ? "Sign In" : "Create Account"}
            </button>
            {hasAccount ? (
              <p className="font-courier text-lg text-center text-white">
                Don&apos;t have an account? Register{" "}
                <button
                  className="underline"
                  type="button"
                  onClick={() => {
                    resetStates();
                    setHasAccount((prev) => !prev);
                  }}
                >
                  here
                </button>
              </p>
            ) : (
              <p className="font-courier text-lg text-center text-white">
                Already have an account? Login{" "}
                <button
                  className="underline"
                  type="button"
                  onClick={() => {
                    resetStates();
                    setHasAccount((prev) => !prev);
                  }}
                >
                  here
                </button>
              </p>
            )}
          </div>
          <p className="font-courier text-lg text-white text-center">
            {message}
          </p>
        </form>
      )}
      {menu && (
        <form
          onSubmit={handleGenres}
          className={`bg-red p-[40px] flex flex-col justify-center items-center gap-10 fixed left-[15px] w-[calc(100vw-30px)] top-[20%] transition duration-300 
      ${
        isLoginOpen
          ? "z-9 opacity-100 pointer-events-auto"
          : "-z-1 opacity-0 pointer-events-none"
      }`}
        >
          <p className="font-garmond text-4xl text-black">Register</p>
          <div className="flex flex-wrap justify-center font-garamond text-xl">
            {availableGenres.map((genre, index) => {
              return (
                <button
                  key={genre + index}
                  type="button"
                  className={`px-3 py-1 transition-all duration-300 ${genres.includes(genre) ? "text-white" : "text-black hover:text-grey-1"}`}
                  onClick={() => {
                    toggleGenre(genre);
                  }}
                >
                  {genre}
                </button>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-[100%] rounded h-15 text-center bg-black text-white text-2xl"
            >
              Continue
            </button>
            <p className="font-courier text-lg text-center text-white">
              Already have an account? Login{" "}
              <button
                className="underline"
                type="button"
                onClick={() => {
                  setMenu((prev) => !prev);
                  setHasAccount((prev) => !prev);
                  setGenres([]);
                }}
              >
                here
              </button>
            </p>
          </div>
          <p className="font-courier text-lg text-white text-center">
            {message}
          </p>
        </form>
      )}
    </>
  );
}
