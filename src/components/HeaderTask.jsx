import Button from './Button'
import IconAdd from '../assets/IconAdd.svg?react'
import IconTrash from '../assets/IconTrash.svg?react'
import IconSun from '../assets/IconSun.svg?react'
import IconFoggy from '../assets/IconFoggy.svg?react'
import IconMoon from '../assets/IconMoon.svg?react'
import TaskSeparate from './TaskSeparate'
import { useState } from 'react'
import Tasks from '../data/taskData'
import TaskItem from './TaskItem'

const Task = () => {
    const [tasks, setTasks] = useState(Tasks)
    const morningTask = tasks.filter((task) => task.period === 'morning')
    const eveningTask = tasks.filter((task) => task.period === 'evening')
    const afternoonTask = tasks.filter((task) => task.period === 'afternoon')

    return (
        <div className="flex h-screen w-screen flex-col gap-5 bg-[#f0f4f6] px-5 pt-10">
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
                        <TaskItem key={index} task={task} />
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <TaskSeparate img={<IconFoggy />}> Tarde</TaskSeparate>
                    {afternoonTask.map((task, index) => (
                        <TaskItem key={index} task={task} />
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <TaskSeparate img={<IconMoon />}> Noite</TaskSeparate>
                    {eveningTask.map((task, index) => (
                        <TaskItem key={index} task={task} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Task
