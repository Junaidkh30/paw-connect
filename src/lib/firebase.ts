import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const env = import.meta.env;

const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
] as const;

if (env["DEV"]) {
  for (const envVar of requiredEnvVars) {
    if (!env[envVar]) {
      console.warn(`Missing Firebase environment variable: ${envVar}. Verify your .env file.`);
    }
  }
}

export const firebaseConfig = {
  apiKey: env["VITE_FIREBASE_API_KEY"] || "",
  authDomain: env["VITE_FIREBASE_AUTH_DOMAIN"] || "",
  projectId: env["VITE_FIREBASE_PROJECT_ID"] || "",
  storageBucket: env["VITE_FIREBASE_STORAGE_BUCKET"] || "",
  messagingSenderId: env["VITE_FIREBASE_MESSAGING_SENDER_ID"] || "",
  appId: env["VITE_FIREBASE_APP_ID"] || "",
  measurementId: env["VITE_FIREBASE_MEASUREMENT_ID"] || "",
};

// Initialize Firebase (singleton pattern safe for SSR / HMR)
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

// Initialize Analytics safely on client-side only
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
export default app;
