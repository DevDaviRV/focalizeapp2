import { createContext, useReducer, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { User } from "firebase/auth";

 type AuthContextType = {
    user: User | null;
    authIsReady: boolean;
    dispatch: React.Dispatch<AuthAction>;
  }

type AuthContextProviderProps =  {
    children: ReactNode;
  }
type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "AUTH_IS_READY"; payload: User | null };


const initialState: AuthContextType = {
  user: null,
  authIsReady: false,
  dispatch: () => {},
};

const authReducer = (
  state: AuthContextType,
  action: AuthAction
): AuthContextType => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};


export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
