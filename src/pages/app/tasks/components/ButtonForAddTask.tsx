import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as uuid from 'uuid';
import { useUserEmailAuth } from "@/hooks/useUserEmailAuth";
import { useTasks } from "../hooks/useTasks";
import { TaskData } from "@/types/TaskData";
import { FirebaseError } from "firebase/app";

type ButtonForAddTaskProps = {
    tasks: TaskData[],
    setTasks: React.Dispatch<React.SetStateAction<TaskData[]>>;
  }

export function ButtonForAddTask({ tasks, setTasks }: ButtonForAddTaskProps) {
  const [taskFormData, setTaskFormData] = useState({
    id: uuid.v4(),
    name: "",
    deadline: "",
    hourForFinished: "",
  });

  const {userEmail} = useUserEmailAuth();
  const { addTask } = useTasks(userEmail);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTaskFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { name, deadline, hourForFinished } = taskFormData;

    const taskForAdd : TaskData = {
        id: uuid.v4(),
        name,
        hourForFinished,
        finished: false,
        deadline
    };

    try {
      await addTask(taskForAdd);
      setTasks([...tasks, taskForAdd]);
      setTaskFormData({
        id: uuid.v4(),
        name: "",
        deadline: "",
        hourForFinished: "",
      });
    }catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error('Erro ao adicionar a tarefa:', error.message);
      } else {
        console.error('Erro ao adicionar a tarefa:', error);
      }
      throw error;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">Adicionar tarefa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleFormSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar tarefa</DialogTitle>
            <DialogDescription>
              Adicione aqui as especificações da sua tarefa
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Fazer o almoço"
                className="col-span-3"
                value={taskFormData.name}
                onChange={handleInputChange}
              />
            </div>
        
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deadline" className="text-right">
                Data de término
              </Label>
              <Input
                type="date"
                id="deadline"
                placeholder="01/04/2024"
                className="col-span-3"
                value={taskFormData.deadline}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hourForFinished" className="text-right">
                Hora de término
              </Label>
              <Input
                type="time"
                id="hourForFinished"
                placeholder="14:00"
                className="col-span-3"
                value={taskFormData.hourForFinished}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Adicionar</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
