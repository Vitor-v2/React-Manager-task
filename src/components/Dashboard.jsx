import { IconCheck, IconGlass, IconList, IconLoading } from '../assets/Icons'
import { DashBoardCard } from './DashboardCard'
import { Header } from './Header'

export const DashBoard = () => {
    return (
        <>
            <div className="bg-background-task flex h-screen w-screen flex-col gap-5 px-5 pt-10">
                <Header />
                <div className="flex justify-between">
                    <DashBoardCard
                        icon={<IconList className="text-primary-color" />}
                        mainName="5"
                        secondName="Tarefas Disponíveis"
                    />
                    <DashBoardCard
                        icon={<IconCheck className="text-primary-color" />}
                        mainName="5"
                        secondName="Tarefas concluídas"
                    />
                    <DashBoardCard
                        icon={
                            <IconLoading className="text-primary-color animate-spin" />
                        }
                        mainName="5"
                        secondName="Tarefas em andamento"
                    />
                    <DashBoardCard
                        icon={<IconGlass />}
                        mainName="50%"
                        secondName="Água"
                    />
                </div>
            </div>
        </>
    )
}
