import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryTaskKeys } from '../../key/queriesTaskKeys'
import { api } from '../axios/axios'

export const useDeleteAllTasks = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['deleteAll'],
        mutationFn: async () => {
            //Não é possível limpar a lista JsonServer
            const { data: tasks } = await api.get(`/tasks`)
            tasks.map(async (tasks) => {
                await api.delete(`/tasks/${tasks.id}`)
            })
            return []
        },
        onSuccess: () => {
            queryClient.setQueryData(queryTaskKeys.getAll(), () => {
                return []
            })
        },
    })
}
