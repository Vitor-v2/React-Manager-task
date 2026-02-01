import { useMutation, useQueryClient } from '@tanstack/react-query'

import { mutationkeys } from '../../key/mutations'
import { queryTaskKeys } from '../../key/queriesTaskKeys'
import { api } from '../axios/axios'

export const useSubmitTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: mutationkeys.submitTask(),
        mutationFn: async (task) => {
            const { data } = await api.post('/tasks', task)
            return data
        },

        onSuccess: (taskCreated) => {
            queryClient.setQueryData(queryTaskKeys.getAll(), (currentTask) => {
                return [...currentTask, taskCreated]
            })
        },
    })
}
