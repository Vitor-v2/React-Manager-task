const DashBoardCard = ({ mainName, icon, secondName }) => {
    return (
        <div className="bg-card flex w-auto min-w-2xs flex-col items-center gap-1 rounded-xl p-5">
            <div className="flex items-center gap-3">
                {icon}
                <p className="text-xl font-bold">{mainName}</p>
            </div>
            <p className="text-xl font-semibold">{secondName}</p>
        </div>
    )
}

export default DashBoardCard
