import { Link } from 'react-router'
import { toast } from 'sonner'

import { IconCheck, IconLoading, IconShare, IconTrash } from '../assets/Icons'
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { useUpdateTask } from '../hooks/data/use-update-taks'
import Button from './Button'

const TaskItem = ({ task }) => {
    const { mutate: deleteTask, isPending: relodingDeleteTask } = useDeleteTask(
        task.id
    )

    const { mutate: updateTask } = useUpdateTask(task.id)

    const statusClasses = () => {
        if (task.status === 'done') {
            return 'bg-green-400/50'
        }
        if (task.status === 'in_progress') {
            return 'bg-yellow-400/50'
        }
        if (task.status === 'not_started') {
            return 'bg-gray-400/50'
        }
    }

    const HandleDeleteItem = async () => {
        deleteTask(undefined, {
            onSuccess: () => {
                toast.info('Item deletado com sucesso')
            },
            onError: () => {
                toast.error('Erro ao excluir a tarefa')
            },
        })
    }

    const getStatus = () => {
        if (task.status === 'not_started') {
            return 'in_progress'
        }
        if (task.status === 'in_progress') {
            return 'done'
        }
        return 'not_started'
    }

    const HandleClickCheckBox = () => {
        updateTask(
            {
                status: getStatus(),
            },
            {
                onSuccess: () => toast.success('Status alterado'),
                onError: () => {
                    toast.error('Erro ao atualizar a tarefa')
                },
            }
        )
    }

    return (
        <>
            <div
                className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 ${statusClasses()}`}
            >
                <div className="flex gap-5">
                    <label
                        className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg delay-75 ${statusClasses()}`}
                    >
                        {task.status === 'done' ? (
                            <IconCheck className="text-white" />
                        ) : null}
                        {task.status === 'in_progress' ? (
                            <IconLoading className="animate-spin text-white" />
                        ) : null}
                        <input
                            type="checkbox"
                            className="absolute h-full w-full cursor-pointer opacity-0"
                            onChange={HandleClickCheckBox}
                        />
                    </label>
                    {task.title}
                </div>
                <div className="flex content-center items-center gap-5">
                    <Button
                        key={task.id}
                        variant="ghost"
                        type="button"
                        onClick={() => {
                            HandleDeleteItem()
                        }}
                        className="cursor-pointer"
                        disabled={relodingDeleteTask}
                    >
                        {relodingDeleteTask ? (
                            <IconLoading className="animate-spin" />
                        ) : (
                            <IconTrash className="text-black/60" />
                        )}
                    </Button>
                    <Link to={`/tasks/${task.id}`}>
                        <IconShare className="text-black/60" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default TaskItem
