import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const TaskDetailPage = () => {
    const { taskId } = useParams()
    const [detailTask, setDetailTask] = useState()

    useEffect(() => {
        const fetchTask = async () => {
            const result = await fetch(
                `http://localhost:3000/tasks/${taskId}`,
                {
                    method: 'GET',
                }
            )
            const data = await result.json()
            setDetailTask(data)
        }

        fetchTask()
    }, [taskId])

    return (
        <div>
            <p>
                {detailTask?.description}
                {detailTask?.title}
            </p>
        </div>
    )
}

export default TaskDetailPage
