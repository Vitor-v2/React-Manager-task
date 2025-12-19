import CheckIcon from '../assets/check.svg?react'
import LoaderIcon from '../assets/loader.svg?react'
import ShareIcon from '../assets/IconShare.svg?react'

const TaskItem = ({ task }) => {
    const statusClasses = () => {
        if (task.status === 'done') {
            return 'bg-green-400'
        }
        if (task.status === 'in_progress') {
            return 'bg-yellow-400'
        }
        if (task.status === 'not_started') {
            return 'bg-gray-400'
        }
    }

    return (
        <>
            <div
                className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 ${statusClasses()}/20`}
            >
                <div className="flex gap-5">
                    <label
                        className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${statusClasses()}`}
                    >
                        {task.status === 'done' ? (
                            <CheckIcon className="text-white" />
                        ) : null}
                        {task.status === 'in_progress' ? (
                            <LoaderIcon className="animate-spin text-white" />
                        ) : null}
                        <input
                            type="checkbox"
                            className="absolute h-full w-full cursor-pointer opacity-0"
                        />
                    </label>
                    {task.title}
                </div>
                <a href="#">
                    <ShareIcon className="text-white opacity-50" />
                </a>
            </div>
        </>
    )
}

export default TaskItem
