import NavSide from '../components/SideBar'
import Task from '../components/Task'

export function TasksPage() {
    return (
        <div id="page" className="flex">
            <NavSide />
            <Task />
        </div>
    )
}
