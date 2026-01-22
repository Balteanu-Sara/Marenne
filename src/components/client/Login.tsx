"use client";
import { useStateContext } from "@/context/CurrentStateContext";
import { register, login } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { isLoginOpen, toggleLogin } = useStateContext();
  const [hasAccount, setHasAccount] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (hasAccount) {
      const result = await login(email, password);
      if (result.success) router.push("/");
      else setMessage(result.error.message);
    } else {
      const result = await register(email, username, password);
      if (result.success) router.push("/");
      else setMessage(result.error.message);
    }
  }

  return (
    <>
      {isLoginOpen && (
        <div className="fixed inset-0 z-5" onClick={toggleLogin} />
      )}
      <form
        onSubmit={handleSubmit}
        className={`bg-red p-[15px] flex flex-col justify-center items-center gap-10 fixed left-[15px] w-[calc(100vw-30px)] top-[20%] h-[calc(100vh-450px)] transition duration-300 
      ${
        isLoginOpen
          ? "z-9 opacity-100 pointer-events-auto"
          : "-z-1 opacity-0 pointer-events-none"
      }`}
      >
        <p className="font-garmond text-4xl text-black">
          {hasAccount ? "Login" : "Register"}
        </p>
        <div className="w-[80%] border-b-white border-b-[2px]">
          <input
            type="text"
            placeholder={
              hasAccount ? "Type in your username" : "Type in an username"
            }
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="text-black font-garamond outline-none w-[100%] text-center"
          />
        </div>
        {!hasAccount && (
          <div className="w-[80%] border-b-white border-b-[2px]">
            <input
              type="text"
              placeholder="Type in an email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-black font-garamond outline-none w-[100%] text-center"
            />
          </div>
        )}
        <div className="w-[80%] border-b-white border-b-[2px]">
          <input
            type="text"
            placeholder="Type in your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black font-garamond outline-none w-[100%] text-center"
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
                onClick={() => setHasAccount((prev) => !prev)}
              >
                here
              </button>
              .{" "}
            </p>
          ) : (
            <p className="font-courier text-lg text-center text-white">
              Already have an account? Login{" "}
              <button
                className="underline"
                onClick={() => setHasAccount((prev) => !prev)}
              >
                here
              </button>
              .{" "}
            </p>
          )}
        </div>
        <p>{message}</p>
      </form>
    </>
  );
}
