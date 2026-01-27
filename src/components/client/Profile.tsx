"use client";
import { useStateContext } from "@/context/CurrentStateContext";

export default function Profile() {
  const { isProfileOpen, toggleProfile } = useStateContext();
  return (
    <>
      {isProfileOpen && (
        <div className="fixed inset-0 z-5" onClick={toggleProfile} />
      )}
      {<div className="bg-green">Profile</div>}
    </>
  );
}
