/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, timestamp } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string, name: string) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        setIsPending(false);
        throw new Error("Não foi possível realizar o cadastro.");
      }

      console.log(`valor do name no hook =>`, name);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await updateProfile(auth.currentUser, { displayName: name });

      const createdAt = timestamp;

      // Create a user document
      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        online: true,
        createdAt,
        level: {
          name: "Starter",
          xp: 0,
          levelUp: 200,
        },
        tasks: [],
        email: email,
        name: name,
      });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      // Update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log((err as Error).message);
        setError((err as Error).message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => () => setIsCancelled(true), []);

  return { error, isPending, signup };
};
