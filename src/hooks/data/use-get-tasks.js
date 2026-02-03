import { useQuery } from '@tanstack/react-query'

import { queryTaskKeys } from '../../key/queriesTaskKeys'
import { api } from '../axios/axios'

export const useGetTasks = () => {
    return useQuery({
        queryKey: queryTaskKeys.getAll(),
        queryFn: async () => {
            const { data: result } = await api.get('/tasks')
            return result
        },
    })
}
