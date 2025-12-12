import Button from './Button'
import IconAdd from '../assets/IconAdd.svg?react'
import IconTrash from '../assets/IconTrash.svg?react'
import IconSun from '../assets/IconSun.svg?react'
import IconFoggy from '../assets/IconFoggy.svg?react'
import IconMoon from '../assets/IconMoon.svg?react'
import TaskSeparate from './TaskSeparate'

const Task = () => {
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
            <div className="flex flex-col gap-10 rounded-xl bg-white p-5">
                <TaskSeparate img={<IconSun />}> Manhã</TaskSeparate>
                <TaskSeparate img={<IconFoggy />}> Tarde</TaskSeparate>
                <TaskSeparate img={<IconMoon />}> Noite</TaskSeparate>
            </div>
        </div>
    )
}

export default Task
