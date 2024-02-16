import { useEffect, useState } from "react";
import { auth } from '../firebase/config';
import { User } from "firebase/auth";

type UseUserEmailAuthReturnType = {
  userEmail: string;
};

const useUserEmailAuth = (): UseUserEmailAuthReturnType => {
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user && user.email) {
        if (user.email !== userEmail) { // Adicione esta verificação
          setUserEmail(user.email);
        }
      } else {
        setUserEmail("");
      }
    });
  
    return () => unsubscribe();
  }, [userEmail]);

  console.log(`email no loop =>`, userEmail);

  return {
    userEmail,
  };
};

export { useUserEmailAuth };
