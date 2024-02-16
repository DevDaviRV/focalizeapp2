import {updateDoc, getDoc , setDoc, arrayUnion } from 'firebase/firestore';
import { TaskData } from '@/types/TaskData';
import { FirebaseError } from 'firebase/app';
import { getUserDocument } from '@/utils/getUserDocument';


export function useTasks (userEmail: string) {

  const fetchTasks = async (): Promise<TaskData[]> => {
    const userDocRef = await getUserDocument(userEmail);
    try {
      const userDocSnapshot = await getDoc(userDocRef);
      const tasksData: TaskData[] = (userDocSnapshot.data()?.tasks || []) as TaskData[];
      return tasksData;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Erro ao buscar tarefas:', error.message);
      } else {
        console.error('Erro ao buscar tarefas:', error);
      }
      throw error;
    }
  };


  const addTask = async (taskData: TaskData): Promise<TaskData> => {
    const userDocRef = await getUserDocument(userEmail);
    try {
      await setDoc(userDocRef, {
        tasks: arrayUnion(taskData),
      }, {merge: true});
      
      return taskData;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Erro ao adicionar a tarefa:', error.message);
      } else {
        console.error('Erro ao adicionar a tarefa:', error);
      }
      throw error;
    }
  };

  const updateTask = async (userEmail: string, taskId: string, updatedData: Partial<TaskData>): Promise<TaskData> => {
    try {
      const userTasksCollection = await getUserDocument(userEmail);

      const userSnapshot = await getDoc(userTasksCollection);
      if (!userSnapshot.exists()) {
        throw new Error('Documento do usuário não encontrado.');
      }

      // Atualiza a tarefa específica no array
      const tasksArray: TaskData[] = userSnapshot.data()?.tasks || [];
      const tasksUpdated = tasksArray.map((task: TaskData) =>
        task.id === taskId ? { ...task, ...updatedData } : task
      );

      // Atualiza o documento com o array de tarefas atualizado
      await updateDoc(userTasksCollection, {
        tasks: tasksUpdated,
      });

      return { ...updatedData, id: taskId } as TaskData;

    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Erro ao atualizar a tarefa:', error.message);
      } else {
        console.error('Erro ao atualizar a tarefa:', error);
      }
      throw error;
    }
  };


  return {
    fetchTasks,
    addTask,
    updateTask,
  };
}

