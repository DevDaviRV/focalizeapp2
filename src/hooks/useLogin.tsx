import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const loginWithGoogle = async (action:string) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);

      if(action === "login") {
        const userRef = doc(db, "users", res.user.uid);
        await updateDoc(userRef, {isActive: true});
        dispatch({type: "LOGIN", payload: res.user})
      }
     
      if(!isCancelled) {
        setIsPending(false);
        return {
          result: "sucess",
          userId: res.user.uid || "",
          message: "Login com google realizado com sucesso",
        };
      }
    } catch (error) {
      const errorMessage = "Erro ao efetuar login com o Google. Tente novamente.";
      console.log(error);
      setError(errorMessage);
      setIsPending(false);
  
      return {
        result: "error",
        error: error,
        message: errorMessage,
      };
    }
  }

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const userRef = doc(db, "users", res.user.uid);

      await updateDoc(userRef, { isActive: true });


      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        return {
          result: "success",
          userId: res.user.uid || "",
          message: "Login realizado com sucesso",
        };
      }
    } catch (error) {
      let errorMessage = "Erro ao efetuar login. Tente novamente.";

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (error.code === "auth/user-not-found") {
        errorMessage = "Email não encontrado. Verifique o email fornecido.";
      }
      setError(errorMessage);
      setIsPending(false);

      return {
        result: "error",
        userId: "",
        message: errorMessage,
      };
    }
  };

  useEffect(() => {
    return () => {
      setIsPending(false);
      setIsCancelled(true);
    };
  }, []);

  return { login,loginWithGoogle, error, isPending };
};
