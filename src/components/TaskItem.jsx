import CheckIcon from '../assets/check.svg?react'
import ShareIcon from '../assets/IconShare.svg?react'
import TrashIcon from '../assets/IconTrash.svg?react'
import LoaderIcon from '../assets/loader.svg?react'
import Button from './Button'

const TaskItem = ({ task, handleCheckBox, onDelete, reloadingIcon }) => {
    const statusClasses = () => {
        if (task.status === 'done') {
            return 'bg-green-400/50'
        }
        if (task.status === 'in_progress') {
            return 'bg-yellow-400/50'
        }
        if (task.status === 'not_started') {
            return 'bg-gray-400/50'
        }
    }

    return (
        <>
            <div
                className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 ${statusClasses()}`}
            >
                <div className="flex gap-5">
                    <label
                        className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg delay-75 ${statusClasses()}`}
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
                            onChange={() => {
                                handleCheckBox(task.id)
                            }}
                        />
                    </label>
                    {task.title}
                </div>
                <div className="flex content-center gap-5">
                    <Button
                        key={task.id}
                        variant="ghost"
                        type="button"
                        onClick={() => {
                            onDelete(task.id)
                        }}
                        className="cursor-pointer"
                    >
                        {reloadingIcon ? (
                            <LoaderIcon className="animate-spin" />
                        ) : (
                            <TrashIcon className="text-black/60" />
                        )}
                    </Button>
                    <a href="#">
                        <ShareIcon className="text-black/60" />
                    </a>
                </div>
            </div>
        </>
    )
}

export default TaskItem
