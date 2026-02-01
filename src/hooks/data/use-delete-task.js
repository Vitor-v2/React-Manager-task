import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTask = (taskId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: 'delete-item',
        mutationFn: async () => {
            const response = await fetch(
                `http://localhost:3000/tasks/${taskId}`,
                {
                    method: 'DELETE',
                }
            )
            return response.json()
        },
        onSuccess: () => {
            queryClient.setQueryData(['tasks'], (currentTask) => {
                return currentTask.filter(
                    (currentTask) => taskId !== currentTask?.id
                )
            })
        },
    })
}
