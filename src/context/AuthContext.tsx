import { useReducer, useEffect, type ReactNode } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../firebase/config";
import { AuthContext, type AuthAction } from "./AuthContext";

// ── State ──────────────────────────────────────────
interface AuthState {
  user: User | null;
  authIsReady: boolean;
}

// ── Reducer ────────────────────────────────────────
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_IS_READY":
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

// ── Provider ───────────────────────────────────────
interface Props {
  children: ReactNode;
}

const SESSION_KEY = "tdn_session_start";
const SESSION_MAX_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const stored = localStorage.getItem(SESSION_KEY);
        if (!stored) {
          // Pre-existing session (before this feature) — stamp it now
          localStorage.setItem(SESSION_KEY, Date.now().toString());
        } else if (Date.now() - Number(stored) > SESSION_MAX_MS) {
          // Session older than 7 days — sign out silently
          signOut(auth);
          return;
        }
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });
    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
