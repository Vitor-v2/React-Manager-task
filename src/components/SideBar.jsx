import IconHome from '../assets/IconHome.svg?react'
import IconList from '../assets/IconList.svg?react'
import SideBarButtons from './SideBarButton'

function SideBar(props) {
    return (
        <>
            <nav>
                <div className="flex h-screen w-60 flex-col px-5 py-8">
                    <div className="flex flex-col gap-2.5">
                        <h4 className="text-secondary-color pl-3 font-[Poppins] font-bold">
                            Task Manager
                        </h4>
                        <p className="pl-3 font-[Poppins] text-xs">
                            Um simples{' '}
                            <span className="text-secondary-color font-bold">
                                organizador de tarefas
                            </span>
                        </p>
                    </div>
                    <div className="mt-5 flex flex-col gap-5">
                        <SideBarButtons url="#home" status="selected">
                            <IconHome />
                            Início
                        </SideBarButtons>
                        <SideBarButtons url="#manageList" status="unselected">
                            <IconList />
                            Gerenciar lista
                        </SideBarButtons>
                    </div>
                </div>
            </nav>
            <h1>{props.children}</h1>
        </>
    )
}

export default SideBar
