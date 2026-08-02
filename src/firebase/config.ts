import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  initializeAppCheck,
  ReCaptchaEnterpriseProvider,
} from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyBLFG7yBNqfpqNgMH3VNbZPFGkt_yNE_v4",
  authDomain: "skolski-rokovnik.firebaseapp.com",
  projectId: "skolski-rokovnik",
  storageBucket: "skolski-rokovnik.firebasestorage.app",
  messagingSenderId: "766030902145",
  appId: "1:766030902145:web:eabf3a3c9e5cdbe5572e80",
};

//init firebase
const app = initializeApp(firebaseConfig);

// ── App Check (reCAPTCHA Enterprise) ──────────────────────────────
// Protects against bots & abuse for all Firebase services (Auth, Firestore, etc.)
// 1M free verifications/month on Spark plan.
//
// Setup:
//   1. Firebase Console → Security → App Check → Register your web app
//      (the wizard creates a site key automatically)
//   2. Set VITE_RECAPTCHA_ENTERPRISE_SITE_KEY in .env.local
//   3. For local dev: Firebase Console → App Check → Apps → ⋮ → Manage debug tokens
//      → Generate a token → set VITE_APPCHECK_DEBUG_TOKEN in .env.local

const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_ENTERPRISE_SITE_KEY || "";

// Initialize App Check when we have a real site key (starts with "6L")
if (RECAPTCHA_SITE_KEY.startsWith("6L")) {
  // In dev mode, use the debug token from .env.local (or auto-detect via console)
  if (import.meta.env.DEV) {
    const debugToken = import.meta.env.VITE_APPCHECK_DEBUG_TOKEN || true;
    (self as unknown as Record<string, unknown>).FIREBASE_APPCHECK_DEBUG_TOKEN =
      debugToken;
  }

  initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(RECAPTCHA_SITE_KEY),
    isTokenAutoRefreshEnabled: true,
  });
}

//init firestore db
const db = getFirestore(app);

//init auth
const auth = getAuth(app);

export { db, auth, Timestamp };
