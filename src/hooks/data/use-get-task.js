import { useQuery } from '@tanstack/react-query'

export const useGetTask = (taskId, reset) => {
    return useQuery({
        queryKey: ['getTaskDetail'],
        queryFn: async () => {
            const response = await fetch(
                `http://localhost:3000/tasks/${taskId}`,
                {
                    method: 'GET',
                }
            )
            const data = await response.json()
            reset(data)
            return data
        },
    })
}
