import { useQuery } from '@tanstack/react-query'

import { mutationkeys } from '../../key/mutations'
import { api } from '../axios/axios'

export const useGetTasks = () => {
    return useQuery({
        queryKey: mutationkeys.getTasks(),
        queryFn: async () => {
            const { data: result } = await api.get('/tasks')
            return result
        },
    })
}
