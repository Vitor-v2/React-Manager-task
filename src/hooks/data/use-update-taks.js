import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

import { queryTaskKeys } from '../../key/queriesTaskKeys'
import { api } from '../axios/axios'

export const useUpdateTask = (taskId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['updateTask'],
        mutationFn: async (taskUpdate) => {
            const { data: task } = await api.patch(`/tasks/${taskId}`, {
                title: taskUpdate.title.trim(),
                period: taskUpdate.period.trim(),
                description: taskUpdate.description.trim(),
            })

            // if (!submitTask.ok) {
            //     throw new Error('Erro ao atualizar a Tarefa ')
            // }

            // const task = await submitTask.json()
            queryClient.setQueryData(queryTaskKeys.getAll(), (oldTasks) => {
                if (oldTasks.id === task.id) {
                    return task
                }
                return oldTasks
            })
            queryClient.setQueryData(queryTaskKeys.getOne(taskId), taskUpdate)
        },
    })
}
