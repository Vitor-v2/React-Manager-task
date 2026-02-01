import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateTask = (taskId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['updateTask'],
        mutationFn: async (taskUpdate) => {
            const submitTask = await fetch(
                `http://localhost:3000/tasks/${taskId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({
                        title: taskUpdate.title.trim(),
                        period: taskUpdate.period.trim(),
                        description: taskUpdate.description.trim(),
                    }),
                }
            )
            if (!submitTask.ok) {
                throw new Error('Erro ao atualizar a Tarefa ')
            }

            const task = await submitTask.json()
            return task
        },
        onSuccess: (task) => {
            queryClient.setQueryData(['getTaskDetail'], (oldTasks) => {
                if (oldTasks.id === task.id) {
                    return task
                }
                return oldTasks
            })
        },
    })
}
