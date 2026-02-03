import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

import { mutationkeys } from '../../key/mutations'
import { queryTaskKeys } from '../../key/queriesTaskKeys'
import { api } from '../axios/axios'

export const useUpdateTask = (taskId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: mutationkeys.updateTask(taskId),
        mutationFn: async (taskUpdate) => {
            const { data: task } = await api.patch(`/tasks/${taskId}`, {
                title: taskUpdate.title?.trim(),
                period: taskUpdate.period,
                description: taskUpdate.description?.trim(),
                status: taskUpdate.status,
            })

            // if (!submitTask.ok) {
            //     throw new Error('Erro ao atualizar a Tarefa ')
            // }

            // const task = await submitTask.json()
            queryClient.setQueryData(queryTaskKeys.getAll(), (oldTasks) => {
                return oldTasks.map((oldTask) => {
                    if (oldTask.id == taskId) {
                        return task
                    }
                    return oldTask
                })
            })
            queryClient.setQueryData(queryTaskKeys.getOne(taskId), taskUpdate)
        },
    })
}
