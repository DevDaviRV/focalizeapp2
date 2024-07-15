import { Checkbox } from "@/components/ui/checkbox";
import { TaskData } from "@/types/TaskData";
import { formatDate } from "@/utils/formatDate";
import { DeleteTask } from "./DeleteTask";
import { User } from "firebase/auth";

type TaskCardProps = {
  tasks: TaskData[];
  onCheckboxChange: (taskId: string) => void;
  user: User;
  reloadTasks: () => void;
};

export function TaskCard({
  tasks,
  onCheckboxChange,
  user,
  reloadTasks,
}: TaskCardProps) {
  const handleCheckboxChange = (taskId: string) => {
    onCheckboxChange(taskId);
  };

  const userEmail = user.email;

  return (
    <div className="h-screen max-h-[70vh] overflow-y-auto shadow-md">
      {tasks && tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="task-balloon rounded-lg bg-purple-700 bg-opacity-50 flex items-center gap-6 w-fit p-4 my-2"
            style={{
              alignSelf: "flex-start",
              marginLeft: "16px",
              marginTop: "20px",
            }}
          >
            <Checkbox
              className="rounded-2xl"
              style={{ backgroundColor: task.finished ? "black" : "black" }}
              checked={task.finished}
              onClick={() => handleCheckboxChange(task.id)}
            />
            <div className="flex flex-col items-start ml-4">
              <p className={`task-name ${task.finished ? "line-through" : ""}`}>
                {task.name}
              </p>
              {!task.finished && (
                <div className="flex items-center text-[12px]">
                  <span>{formatDate(task.deadline)}</span>,{" "}
                  <span>{task.hourForFinished}</span>
                </div>
              )}
            </div>
            <div style={{ color: "#9333ea" }}>
              <DeleteTask

                taskId={task.id}
                userEmail={userEmail as string}
                fetchTasks={reloadTasks}
                style={{ borderColor: "rgb(75, 29, 115)" }}
                balloonColor="#9333ea" // Defina a cor do balão da lixeira
              />
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-center">Nenhuma tarefa foi adicionada ainda.</p>
        </div>
      )}
    </div>
  );
}
