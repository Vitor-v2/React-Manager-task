import NavSide from './components/SideBar'
import HeaderTask from './components/HeaderTask'
import { Toaster } from 'sonner'

function App() {
    return (
        <>
            <div className="flex">
                <NavSide />
                <HeaderTask />
            </div>
        </>
    )
}

export default App
