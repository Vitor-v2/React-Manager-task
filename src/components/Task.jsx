import { useState } from 'react'
import { toast, Toaster } from 'sonner'

import {
    IconAdd,
    IconFoggy,
    IconMoon,
    IconSun,
    IconTrash,
} from '../assets/Icons.js'
import { useDeleteAllTasks } from '../hooks/data/use-delete-alltasks.js'
import { useGetTasks } from '../hooks/data/use-get-tasks.js'
import Button from './Button.jsx'
import CreateDialog from './CreateDialog.jsx'
import Header from './Header.jsx'
import TaskItem from './TaskItem.jsx'
import TaskSeparate from './TaskSeparate.jsx'

const Task = () => {
    const [openDialog, setopenDialog] = useState(false)

    const { data: tasks } = useGetTasks()
    const { mutate } = useDeleteAllTasks()

    const morningTask = tasks?.filter((task) => task.period === 'morning')
    const eveningTask = tasks?.filter((task) => task.period === 'evening')
    const afternoonTask = tasks?.filter((task) => task.period === 'afternoon')

    const HandleDeleteAll = () => {
        mutate(tasks, {
            onSuccess: () => toast.success('Lista limpa'),
            onError: () => toast.error('Erro ao limpar a lista de tarefas.'),
        })
    }

    return (
        <>
            <div className="bg-background-task flex h-screen w-screen flex-col gap-5 px-5 pt-5">
                <Toaster
                    expand="true"
                    visibleToasts={1}
                    theme="system"
                    richColors="true"
                />
                <Header>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            HandleDeleteAll()
                        }}
                    >
                        <IconTrash /> Limpar Tarefa
                    </Button>
                    <Button onClick={() => setopenDialog(true)}>
                        <IconAdd />
                        Nova Tarefa
                    </Button>
                </Header>

                {/* TASKS */}
                <div className="flex flex-col gap-5 overflow-scroll rounded-xl bg-white p-5">
                    <div className="flex flex-col gap-2">
                        <TaskSeparate img={<IconSun />}> Manhã</TaskSeparate>
                        {morningTask?.length > 0 ? (
                            morningTask.map((task, index) => (
                                <TaskItem key={index} task={task} />
                            ))
                        ) : (
                            <i className="opacity-60">
                                Nenhuma tarefa cadastrada para o período da
                                manhã
                            </i>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <TaskSeparate img={<IconFoggy />}> Tarde</TaskSeparate>
                        {afternoonTask?.length > 0 ? (
                            afternoonTask.map((task, index) => (
                                <TaskItem key={index} task={task} />
                            ))
                        ) : (
                            <i className="opacity-60">
                                Nenhuma tarefa cadastrada para o período da
                                tarde
                            </i>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <TaskSeparate img={<IconMoon />}> Noite</TaskSeparate>
                        {eveningTask?.length > 0 ? (
                            eveningTask.map((task, index) => (
                                <TaskItem key={index} task={task} />
                            ))
                        ) : (
                            <i className="opacity-60">
                                Nenhuma tarefa cadastrada para o período da
                                noite
                            </i>
                        )}
                    </div>
                </div>
            </div>
            <CreateDialog
                isOpen={openDialog}
                HandleClickClose={setopenDialog}
            />
        </>
    )
}
export default Task
