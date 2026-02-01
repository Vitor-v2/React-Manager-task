import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSubmitTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: 'submit-task',
        mutationFn: async (task) => {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
            })
            if (!response.ok) {
                throw new Error()
            }

            const taskCreated = await response.json()

            return taskCreated
        },

        onSuccess: (taskCreated) => {
            queryClient.setQueryData(['tasks'], (currentTask) => {
                return [...currentTask, taskCreated]
            })
        },
    })
}
