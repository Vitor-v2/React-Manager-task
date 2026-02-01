import { DashBoard } from '../components/Dashboard'
import NavSide from '../components/SideBar'

export const Home = () => {
    return (
        <div id="page" className="flex">
            <NavSide />
            <DashBoard />
        </div>
    )
}
