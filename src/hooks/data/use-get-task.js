import { useQuery } from '@tanstack/react-query'

import { mutationkeys } from '../../key/mutations'
import { api } from '../axios/axios'

export const useGetTask = (taskId, reset) => {
    return useQuery({
        queryKey: mutationkeys.getTask(),
        queryFn: async () => {
            const { data } = await api.get(`tasks/${taskId}`)
            reset(data)
            return data
        },
    })
}
