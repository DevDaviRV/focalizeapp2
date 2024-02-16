import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useDeleteTask } from "@/hooks/useDeleteTask";


type DelteTaskProps = {
    taskId: string;
    userEmail: string; 
    fetchTasks: () => void;
}

export function DeleteTask({ taskId, userEmail, fetchTasks }: DelteTaskProps){
    const { deleteTask, loading, error } = useDeleteTask();

    const handleDeleteTask = async () => {
        try {
            await deleteTask(userEmail, taskId); 
            fetchTasks();
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="bg-black hover:bg-black w-fit h-fit rounded-full">
                    <Trash size={12} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Você tem certeza?</DialogTitle>
                    <DialogDescription>
                        Essa ação não pode ser desfeita. Após apagar a tarefa, não terá como recuperá-la.
                    </DialogDescription>
                </DialogHeader>

                <Button onClick={handleDeleteTask} disabled={loading}>
                    {loading ? 'Apagando tarefa...' : 'Apagar tarefa'}
                </Button>
                {error && <p>{error}</p>}
            </DialogContent>
        </Dialog>
    )
}
