import { getUserDocument } from "@/utils/getUserDocument";
import { FirebaseError } from "firebase/app";
import { getDoc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";

const useUserXp = (user: User | null) => {
  const userEmail = user?.email || "";

  const [level, setLevel] = useState<string>("");
  const [levelUp, setLevelUp] = useState<number>();
  const [updatedXp, setUpdatedXp] = useState<number>();

  const fetchUserData = async () => {
    try {
      const userDocument = await getUserDocument(userEmail);
      const userSnapshot = await getDoc(userDocument);
      const userData = userSnapshot.data();

      if (userData) {
        const currentLevelUp = userData.level?.levelUp || 0;
        const currentLevel = userData.level?.name || "";
        const currentUpdatedXp = userData.level?.xp || 0;

        setLevel(currentLevel);
        setLevelUp(currentLevelUp);
        setUpdatedXp(currentUpdatedXp);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userEmail]);

  
  const addXp = async (taskState: boolean) => {
    try {
      const userDocument = await getUserDocument(userEmail);
      const userSnapshot = await getDoc(userDocument);
      const currentLevelUp = userSnapshot.data()?.level?.levelUp || 0;
      const currentLevel = userSnapshot.data()?.level?.name || "";
      let xpChange = 0;

      if (taskState) {
        xpChange = 10;
      } else {
        xpChange = -10;
      }

      const newUpdatedXp = (updatedXp || 0) + xpChange;

      setLevelUp(currentLevelUp);
      setLevel(currentLevel);
      setUpdatedXp(newUpdatedXp);

      await updateDoc(userDocument, {
        level: {
          name: currentLevel,
          levelUp: currentLevelUp,
          xp: newUpdatedXp,
        },
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Erro ao adicionar XP:", error.message);
      } else {
        console.error("Erro ao adicionar XP:", error);
      }
      throw error;
    }
  };

  console.log(`valor do updatedXp =>`, updatedXp);

  return {
    level,
    levelUp,
    updatedXp,
    addXp,
  };
};

export { useUserXp };
