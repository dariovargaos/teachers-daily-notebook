import { createContext, type Dispatch } from "react";
import type { User } from "firebase/auth";

// ── Context ────────────────────────────────────────
export interface AuthContextType {
  user: User | null;
  dispatch: Dispatch<AuthAction>;
  authIsReady: boolean;
}

export type AuthAction = { type: "AUTH_IS_READY"; payload: User | null };

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
