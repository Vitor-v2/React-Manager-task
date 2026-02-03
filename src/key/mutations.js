export const mutationkeys = {
    submitTask: () => ['submit-Task'],
    deleteTask: (taskId) => ['delete-item', taskId],
    updateTask: (taskId) => ['updateTask', taskId],
}
