const Header = ({ children }) => {
    return (
        <div className="rounded-xl bg-white p-5">
            <p className="text-primary-color font-[Poppins] text-sm">
                Minhas tarefas
            </p>
            <div className="flex justify-between">
                <p className="content-center font-[Poppins] text-xl">
                    Minhas Tarefas
                </p>
                <div className="flex items-center gap-5">{children}</div>
            </div>
        </div>
    )
}

export default Header
