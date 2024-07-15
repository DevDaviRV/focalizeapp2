import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { ButtonForAddTask } from "./components/ButtonForAddTask";
import { WeekFilter } from "./components/WeekFilter";
import { StateFilter } from "./components/StateFilter";
import { TaskCard } from "./components/TaskCard";
import { FirebaseError } from "firebase/app";
import { TaskData } from "@/types/TaskData";
import { useTasks } from "@/pages/app/tasks/hooks/useTasks";
import { useUserXp } from "@/hooks/useUserXp";
import { useAuthContext } from "@/hooks/useAuthContext";
import { User } from "firebase/auth";

export function Tasks() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const { user } = useAuthContext();
  const userEmailCatch = user?.email ? user.email : "";
  const { fetchTasks, updateTask } = useTasks(userEmailCatch);
  const { addXp } = useUserXp(user);

  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        if (userEmailCatch) {
          const tasksData = await fetchTasks();
          setTasks(tasksData);
        }
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          console.error("Erro ao atualizar as tarefas:", error.message);
        } else {
          console.error("Erro ao atualizar as tarefas:", error);
        }
        throw error;
      }
    };

    fetchTasksData();
  }, [userEmailCatch]);

  const reloadTasks = async () => {
    try {
      if (userEmailCatch) {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error("Erro ao recarregar as tarefas:", error.message);
      } else {
        console.error("Erro ao recarregar as tarefas:", error);
      }
      throw error;
    }
  };

  const handleCheckboxChange = async (taskId: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, finished: !task.finished } : task
    );

    setTasks(updatedTasks);
    try {
      const foundTask = updatedTasks.find((task) => task.id === taskId);
      if (foundTask) {
        await updateTask(userEmailCatch, taskId, {
          finished: foundTask.finished,
        });
        await addXp(foundTask.finished);
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error("Erro ao atualizar as tarefas:", error.message);
      } else {
        console.error("Erro ao atualizar as tarefas:", error);
      }
      throw error;
    }
  };

  return (
    <div
      className="h-screen overflow-hidden bg-gradient-to-r from-zinc-900 to-gray-800 text-white"
      style={{ fontFamily: "Sora, sans-serif" }}
    >
      <div className="h-fit">
        <header className="text-left p-4">
          Olá, <span className="font-semibold">{user?.displayName}</span>
          <p className="py-2 text-gray-400">Crie suas tarefas e acompanhe seu progresso.</p>
        </header>
        <div className="w-full flex justify-between items-center px-2">
          <div className="flex items-start justify-left gap-6 my-4 mx-2">
            <WeekFilter />
            <StateFilter />
          </div>
          <ButtonForAddTask tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
      <Separator className="bg-gray-700" />
      <TaskCard
        tasks={tasks}
        onCheckboxChange={handleCheckboxChange}
        user={user as User}
        reloadTasks={reloadTasks}
      />
    </div>
  );
}
