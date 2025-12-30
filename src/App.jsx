import HeaderTask from './components/HeaderTask'
import NavSide from './components/SideBar'

function App() {
    return (
        <>
            <div id="page" className="flex">
                <NavSide />
                <HeaderTask />
            </div>
        </>
    )
}

export default App
