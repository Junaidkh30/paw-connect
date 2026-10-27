import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  authModalOpen: boolean;
  authModalReason: string;
  openAuthModal: (reason?: string, onAuthenticated?: () => void) => void;
  closeAuthModal: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

function getReadableAuthError(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code: string }).code;
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Invalid email or password. Please try again.";
      case "auth/email-already-in-use":
        return "An account with this email already exists. Try signing in.";
      case "auth/weak-password":
        return "Password is too weak. Please use at least 6 characters.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/popup-closed-by-user":
        return "Sign-in popup was closed before completing.";
      case "auth/popup-blocked":
        return "Popup was blocked by your browser. Please allow popups.";
      case "auth/network-request-failed":
        return "Network connection issue. Please check your internet.";
      case "auth/operation-not-allowed":
        return "This sign-in method is not enabled in the Firebase Console.";
      default:
        return (error as { message?: string }).message || "Authentication failed.";
    }
  }
  return "An unexpected error occurred during authentication.";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState<string>(
    "Sign in or create an account to continue.",
  );
  const [onAuthCallback, setOnAuthCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openAuthModal = (reason?: string, onAuthenticated?: () => void) => {
    if (reason) setAuthModalReason(reason);
    if (onAuthenticated) setOnAuthCallback(() => onAuthenticated);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setOnAuthCallback(null);
  };

  const handleAuthSuccess = (msg: string) => {
    toast.success(msg);
    closeAuthModal();
    if (onAuthCallback) {
      onAuthCallback();
      setOnAuthCallback(null);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      handleAuthSuccess(
        `Welcome back, ${result.user.displayName || result.user.email || "Friend"}!`,
      );
    } catch (error) {
      const message = getReadableAuthError(error);
      toast.error(message);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess(
        `Welcome back, ${result.user.displayName || result.user.email || "Friend"}!`,
      );
    } catch (error) {
      const message = getReadableAuthError(error);
      toast.error(message);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName.trim()) {
        await updateProfile(result.user, { displayName: displayName.trim() });
      }
      handleAuthSuccess(`Welcome to PawConnect, ${displayName || "Friend"}!`);
    } catch (error) {
      const message = getReadableAuthError(error);
      toast.error(message);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("pawconnect-favorites");
      toast.info("You have signed out successfully.");
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        signOutUser,
        authModalOpen,
        authModalReason,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
