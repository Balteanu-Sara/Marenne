import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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
      wishlist: [],
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

export async function logout(): Promise<
  { success: true } | { success: false }
> {
  try {
    await signOut(auth);
    return { success: true };
  } catch (err) {
    console.error("Error at signing out: ", err);
    return { success: false };
  }
}

async function getUserProfile(userId: string): Promise<UserProfile | null> {
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

export async function getUserGenres(userId: string): Promise<string[]> {
  const profile = await getUserProfile(userId);
  return profile?.selectedGenres || [];
}

export async function addGenres(
  userId: string,
  genres: string[],
): Promise<{ success: true } | { success: false }> {
  try {
    const currentGenres = await getUserGenres(userId);
    const docRef = doc(db, "users", userId);
    const updatedGenres = Array.from(new Set([...currentGenres, ...genres]));
    await updateDoc(docRef, { selectedGenres: updatedGenres });

    return { success: true };
  } catch (err) {
    console.error("Error adding genres: ", err);
    return { success: false };
  }
}

export async function removeGenres(
  userId: string,
  genres: string[],
): Promise<{ success: true } | { success: false }> {
  try {
    const currentGenres = await getUserGenres(userId);
    console.log("Current genres: ", currentGenres);
    const updatedGenres = currentGenres.filter((g) => !genres.includes(g));
    console.log("Updated: ", updatedGenres);
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { selectedGenres: updatedGenres });

    return { success: true };
  } catch (err) {
    console.error("Error removing genre: ", err);
    return { success: false };
  }
}

export async function getUserWishlist(userId: string): Promise<string[]> {
  const profile = await getUserProfile(userId);
  return profile?.wishlist || [];
}

export async function addInWishlist(
  userId: string,
  bookId: string,
): Promise<{ success: true } | { success: false }> {
  try {
    const currentWishlist = await getUserWishlist(userId);
    const updatedWishlist = Array.from(new Set([...currentWishlist, bookId]));
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { wishlist: updatedWishlist });
    return { success: true };
  } catch (err) {
    console.error("Error adding to wishlist: ", err);
    return { success: false };
  }
}

export async function removeFromWishlist(
  userId: string,
  bookId: string,
): Promise<{ success: true } | { success: false }> {
  try {
    const currentWishlist = await getUserWishlist(userId);
    const updatedWishlist = currentWishlist.filter((b) => b !== bookId);
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { wishlist: updatedWishlist });
    return { success: true };
  } catch (err) {
    console.error("Error removing from wishlist: ", err);
    return { success: false };
  }
}

export async function updateUsername(
  userId: string,
  newUsername: string,
): Promise<{ success: true } | { success: false }> {
  try {
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { username: newUsername });
    return { success: true };
  } catch (err) {
    console.error("Error updating username: ", err);
    return { success: false };
  }
}
