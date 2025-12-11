import SideBarButtons from "./SideBarButton"
import IconHome from "../assets/IconHome.svg?react"
import IconList from "../assets/IconList.svg?react"

function SideBar(props){
    return <>
    <nav>
        <div className=" bg-teal-50 h-screen w-60 flex flex-col p-5">
            <div className="flex flex-col gap-2.5">
                <h4 className="text-cyan-800 font-bold font-[Poppins] pl-3">Task Manager</h4>
                <p className="text-xs font-[Poppins] pl-3" >Um simples <span className="text-cyan-800 font-bold">organizador de tarefas</span></p>    
            </div>
        <div className="flex flex-col gap-5 mt-5">
        <SideBarButtons url= "#home"variant="selected">
            <IconHome/>
            Início</SideBarButtons>
        <SideBarButtons url= "#manageList"variant='unselected'>
            <IconList/>
            Gerenciar lista
        </SideBarButtons>
        </div>
        </div>
    </nav>
    <h1>{props.children}</h1>
    </>
}

export default SideBar