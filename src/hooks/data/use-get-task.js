import { useQuery } from '@tanstack/react-query'

import { queryTaskKeys } from '../../key/queriesTaskKeys'
import { api } from '../axios/axios'

export const useGetTask = (taskId, reset) => {
    return useQuery({
        queryKey: queryTaskKeys.getOne(taskId),
        queryFn: async () => {
            const { data } = await api.get(`/tasks/${taskId}`)
            reset(data)
            return data
        },
    })
}
