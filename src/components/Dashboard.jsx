import { useState } from 'react'

import {
    IconAdd,
    IconCardList,
    IconList,
    IconListChecked,
    IconLoading,
} from '../assets/Icons'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import Button from './Button'
import CreateDialog from './CreateDialog'
import DashBoardCard from './DashboardCard'
import Header from './Header'
import TaskItem from './TaskItem'
import TaskSeparate from './TaskSeparate'

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

    const taskInProgressInList = data?.map((task) =>
        task.status === 'in_progress' ? (
            <TaskItem key={task.id} task={task} />
        ) : null
    )
    const taskNotStartedInList = data?.map((task) =>
        task.status === 'not_started' ? (
            <TaskItem key={task.id} task={task} />
        ) : null
    )

    return (
        <>
            <div className="bg-background-task flex h-screen w-screen flex-col gap-5 px-5 pt-10">
                <Header>
                    <Button onClick={() => setopenDialog(true)}>
                        <IconAdd />
                        Nova Tarefa
                    </Button>
                </Header>
                <div className="flex justify-between">
                    <DashBoardCard
                        icon={
                            <IconList className="text-primary-color animate-pulse" />
                        }
                        mainName={data?.length}
                        secondName="Tarefas Totais"
                    />

                    <DashBoardCard
                        icon={
                            <IconLoading className="text-primary-color animate-spin" />
                        }
                        mainName={taskNotStarted}
                        secondName="Tarefas não iniciadas"
                    />
                    <DashBoardCard
                        icon={
                            <IconLoading className="text-primary-color animate-spin" />
                        }
                        mainName={taskinProgress}
                        secondName="Tarefas em andamento"
                    />
                    <DashBoardCard
                        icon={
                            <IconListChecked className="text-primary-color animate-pulse" />
                        }
                        mainName={taskCompleted}
                        secondName="Tarefas concluídas"
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex h-full flex-col gap-5 rounded-xl bg-white p-5">
                        <TaskSeparate
                            img={<IconCardList className="text-gray-500" />}
                            children="Tarefas não iniciadas"
                        />
                        <div className="flex flex-col gap-2">
                            {!taskNotStartedInList ? (
                                <i>
                                    Nenhuma tarefa cadastrada para o período da
                                    manhã
                                </i>
                            ) : (
                                taskNotStartedInList
                            )}
                        </div>
                    </div>

                    <div className="flex h-full flex-col gap-5 rounded-xl bg-white p-5">
                        <TaskSeparate
                            img={<IconCardList className="text-gray-500" />}
                            children="Tarefas em progresso"
                        />
                        <div className="flex flex-col gap-2">
                            {!taskInProgressInList ? (
                                <i>
                                    Nenhuma tarefa cadastrada para o período da
                                    manhã
                                </i>
                            ) : (
                                taskInProgressInList
                            )}
                        </div>
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
