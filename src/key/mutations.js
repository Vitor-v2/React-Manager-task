export const mutationkeys = {
    getTasks: () => ['tasks'],
    getTask: (taskId) => ['getTask-Detail', taskId],
    deleteTask: (taskId) => ['delete-item', taskId],
    getOne: (taskId) => ['tasks', taskId],
    submitTask: () => ['submit-Task'],
}
