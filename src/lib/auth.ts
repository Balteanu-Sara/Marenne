import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  AuthError,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { AuthErrorResponse, UserProfile } from "@/types";

function formatAuthError(error: AuthError): AuthErrorResponse {
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "This email is already registered",
    "auth/invalid-email": "Invalid email address",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/user-not-found": "No account found with this email",
    "auth/wrong-password": "Incorrect password",
    "auth/too-many-requests": "Too many attempts. Please try again later",
    "auth/network-request-failed":
      "Network error. Please check your connection",
  };

  return {
    code: error.code,
    message: errorMessages[error.code] || error.message || "An error occurred",
  };
}

export async function register(
  email: string,
  username: string,
  password: string,
): Promise<
  { success: true; user: User } | { success: false; error: AuthErrorResponse }
> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      selectedGenres: [],
      createAt: new Date().toISOString(),
    });

    return { success: true, user };
  } catch (err) {
    return { success: false, error: err as AuthErrorResponse };
  }
}

export async function login(
  email: string,
  password: string,
): Promise<
  { success: true; user: User } | { success: false; error: AuthErrorResponse }
> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { success: true, user: userCredential.user };
  } catch (err) {
    console.error("Error signing in: ", err);

    return { success: false, error: formatAuthError(err as AuthError) };
  }
}

export async function getUserProfile(
  userId: string,
): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, "users", userId);
    const docc = await getDoc(docRef);

    if (docc.exists()) {
      return docc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile: ", error);
    return null;
  }
}
