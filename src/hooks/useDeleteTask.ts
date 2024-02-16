import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { updateDoc, getDoc } from "firebase/firestore";
import { getUserDocument } from "@/utils/getUserDocument";

export function useDeleteTask() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteTask = async (userEmail: string, taskId: string) => {
    setLoading(true);
    setError(null);

    try {
      const userDocRef = await getUserDocument(userEmail);
      const userSnapshot = await getDoc(userDocRef);
      const userData = userSnapshot.data();
      
      if (!userData) {
        throw new Error("Documento do usuário não encontrado.");
      }

      const tasks = userData.tasks || [];
      const taskFound = tasks.find((task) => task.id === taskId);

      if (!taskFound) {
        throw new Error("Tarefa não encontrada.");
      }

      const newArrayWithoutTaskDeleted = tasks.filter((task) => task.id !== taskId);

      await updateDoc(userDocRef, {
        tasks: newArrayWithoutTaskDeleted
      });

      setLoading(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      } else {
        setError("Erro ao deletar a tarefa.");
      }
      setLoading(false);
    }
  };

  return { deleteTask, loading, error };
}
