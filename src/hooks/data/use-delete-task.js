import { useMutation, useQueryClient } from '@tanstack/react-query'

import { mutationkeys } from '../../key/mutations'
import { queryTaskKeys } from '../../key/queriesTaskKeys'
import { api } from '../axios/axios'

export const useDeleteTask = (taskId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: mutationkeys.deleteTask(taskId),
        mutationFn: async () => {
            const { data } = await api.delete(`/tasks/${taskId}`)
            return data
        },
        onSuccess: () => {
            queryClient.setQueryData(queryTaskKeys.getAll(), (currentTask) => {
                return currentTask.filter(
                    (currentTask) => taskId !== currentTask?.id
                )
            })
        },
    })
}
