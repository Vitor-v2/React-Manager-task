import Button from './Button'
import {
    IconAdd,
    IconTrash,
    IconSun,
    IconFoggy,
    IconMoon,
} from '../assets/Icons.js'
import { useState } from 'react'
import TaskSeparate from '../components/TaskSeparate.jsx'
import Tasks from '../data/taskData'
import TaskItem from './TaskItem'
import { toast, Toaster } from 'sonner'

const Task = () => {
    const [tasks, setTask] = useState(Tasks)
    const morningTask = tasks.filter((task) => task.period === 'morning')
    const eveningTask = tasks.filter((task) => task.period === 'evening')
    const afternoonTask = tasks.filter((task) => task.period === 'afternoon')

    const HandleClickCheckBox = (tasksId) => {
        const newTask = tasks.map((task) => {
            if (tasksId !== task.id) {
                return task
            }

            if (task.status === 'done') {
                return { ...task, status: 'in_progress' }
            }
            if (task.status === 'in_progress') {
                return { ...task, status: 'not_started' }
            }
            if (task.status === 'not_started') {
                return { ...task, status: 'done' }
            }
            return { ...task, status: 'done' }
        })

        setTask(newTask)
    }

    const deletedItem = (taskId) => {
        const deletedtask = tasks.filter((task) => taskId !== task.id)
        setTask(deletedtask)
        toast.success('Item deletado com sucesso!')
    }

    return (
        <div className="flex h-screen w-screen flex-col gap-5 bg-[#f0f4f6] px-5 pt-10">
            <Toaster
                expand="true"
                visibleToasts={1}
                theme="system"
                richColors="true"
            />
            <div className="rounded-xl bg-white p-5">
                <p className="font-[Poppins] text-sm text-cyan-500">
                    Minhas tarefas
                </p>
                <div className="flex justify-between">
                    <p className="content-center font-[Poppins] text-xl">
                        Minhas Tarefas
                    </p>
                    <div className="flex items-center gap-5">
                        <Button>
                            <IconAdd />
                            Nova Tarefa
                        </Button>
                        <Button variant="ghost">
                            <IconTrash /> Limpar Tarefa
                        </Button>
                    </div>
                </div>
            </div>

            {/* TASKS */}
            <div className="flex flex-col gap-5 overflow-scroll rounded-xl bg-white p-5">
                <div className="flex flex-col gap-2">
                    <TaskSeparate img={<IconSun />}> Manhã</TaskSeparate>
                    {morningTask.map((task, index) => (
                        <TaskItem
                            key={index}
                            task={task}
                            handleCheckBox={HandleClickCheckBox}
                            onDelete={deletedItem}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <TaskSeparate img={<IconFoggy />}> Tarde</TaskSeparate>
                    {afternoonTask.map((task, index) => (
                        <TaskItem
                            key={index}
                            task={task}
                            handleCheckBox={HandleClickCheckBox}
                            onDelete={deletedItem}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <TaskSeparate img={<IconMoon />}> Noite</TaskSeparate>
                    {eveningTask.map((task, index) => (
                        <TaskItem
                            key={index}
                            task={task}
                            handleCheckBox={HandleClickCheckBox}
                            onDelete={deletedItem}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Task
