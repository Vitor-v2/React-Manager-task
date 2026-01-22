import NavSide from '../components/SideBar'
import Task from '../components/Task'

function TaskManager() {
    return (
        <>
            <div id="page" className="flex">
                <NavSide />
                <Task />
            </div>
        </>
    )
}

export default TaskManager
