const TaskSeparate = ({ children, img }) => {
    return (
        <div className="flex items-center gap-1 border-b-2 border-gray-400/15">
            {img}
            <p className="text-sl font-[Poppins] text-gray-500">{children}</p>
        </div>
    )
}

export default TaskSeparate
