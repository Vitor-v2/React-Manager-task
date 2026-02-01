import { useQuery } from '@tanstack/react-query'

export const useGetTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const data = await fetch('http://localhost:3000/tasks', {
                method: 'GET',
            })
            const result = await data.json()
            return result
        },
    })
}
