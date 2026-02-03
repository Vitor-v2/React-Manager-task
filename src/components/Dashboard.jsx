import { useState } from 'react'

import {
    IconAdd,
    IconCheck,
    IconGlass,
    IconList,
    IconLoading,
    IconTrash,
} from '../assets/Icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import Button from './Button'
import CreateDialog from './CreateDialog'
import DashBoardCard from './DashboardCard'
import Header from './Header'

export const DashBoard = () => {
    const [openDialog, setopenDialog] = useState(false)
    const { data } = useGetTasks()

    const taskCompleted = data?.filter((task) => task.status === 'done').length
    const taskinProgress = data?.filter(
        (task) => task.status === 'in_progress'
    ).length
    const taskNotStarted = data?.filter(
        (task) => task.status === 'not_started'
    ).length

    return (
        <>
            <div className="bg-background-task flex h-screen w-screen flex-col gap-5 px-5 pt-10">
                <Header>
                    <Button variant="ghost">
                        <IconTrash /> Limpar Tarefa
                    </Button>
                    <Button onClick={() => setopenDialog(true)}>
                        <IconAdd />
                        Nova Tarefa
                    </Button>
                </Header>
                <div className="flex justify-between">
                    <DashBoardCard
                        icon={<IconList className="text-primary-color" />}
                        mainName={taskNotStarted}
                        secondName="Tarefas Disponíveis"
                    />
                    <DashBoardCard
                        icon={<IconCheck className="text-primary-color" />}
                        mainName={taskCompleted}
                        secondName="Tarefas concluídas"
                    />
                    <DashBoardCard
                        icon={
                            <IconLoading className="text-primary-color animate-spin" />
                        }
                        mainName={taskinProgress}
                        secondName="Tarefas em andamento"
                    />
                    <DashBoardCard
                        icon={<IconGlass />}
                        mainName="50%"
                        secondName="Água"
                    />
                </div>
            </div>
            <CreateDialog
                isOpen={openDialog}
                HandleClickClose={setopenDialog}
            />
        </>
    )
}
