import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router'
import { toast } from 'sonner'

import { IconChevronLeft, IconChevronRight, IconTrash } from '../assets/Icons'
import Button from '../components/Button'
import InputDialog from '../components/Input'
import SelectTime from '../components/SelectTime'
import SideBar from '../components/SideBar'

const TaskDetailPage = () => {
    const { taskId } = useParams()
    console.log(taskId)

    const { mutate: deleteMutate } = useMutation({
        mutationKey: ['deleteTask', taskId],
        mutationFn: async () => {
            const deleteTask = await fetch(
                `http://localhost:3000/tasks/${taskId}`,
                {
                    method: 'DELETE',
                }
            )
            if (!deleteTask.ok) {
                return toast.error('Erro ao deletar a Tarefa ')
            }
            return deleteTask.json()
        },
    })

    const { mutate: updateMutate, isPending: updateLoading } = useMutation({
        mutationKey: ['updateTask', taskId],
        mutationFn: async (taskUpdate) => {
            const submitTask = await fetch(
                `http://localhost:3000/tasks/${taskId}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(taskUpdate),
                }
            )
            if (!submitTask.ok) {
                return toast.error('Erro ao atualizar a Tarefa ')
            }

            return submitTask.json()
        },
    })

    const { data: detailTask } = useQuery({
        queryKey: ['getTasks', taskId],
        queryFn: async () => {
            const result = await fetch(
                `http://localhost:3000/tasks/${taskId}`,
                {
                    method: 'GET',
                }
            )
            return await result.json()
        },
    })

    const queryClient = useQueryClient()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const navigate = useNavigate()

    const HandleBack = () => {
        navigate(-1)
    }

    const HandleDelete = () => {
        // const deleteTask = await fetch(
        //     `http://localhost:3000/tasks/${detailTask.id}`,
        //     {
        //         method: 'DELETE',
        //     }
        // )
        // if (!deleteTask.ok) {
        //     return toast.error('Erro ao atualizar a Tarefa ')
        // }

        // navigate(-1)
        // toast.success('Tarefa deletada com sucesso!')

        deleteMutate(taskId, {
            onSuccess: (taskId) => {
                queryClient.setQueryData('deleteTask', (currentTask) => {
                    return currentTask.filter(
                        (currentTask) => taskId !== currentTask?.id
                    )
                })
                navigate(-1)
                toast.success('Tarefa deletada ocm sucesso!')
            },
            onError: () => {
                throw new Error()
            },
        })
    }

    const HandleSubmitTask = async (dataUpdate) => {
        const title = dataUpdate.title
        const period = dataUpdate.period
        const description = dataUpdate.description

        const updateData = { title, period, description }

        updateMutate(taskId, updateData, {
            onSuccess: () => {
                queryClient.setQueryData('updateTask', (currentTasks) => {
                    return [...currentTasks, updateData]
                })
            },
            onError: () => {
                return toast.error('Erro ao atualizar a tarefa')
            },
        })
        // const submitTask = await fetch(
        //     `http://localhost:3000/tasks/${detailTask.id}`,
        //     {
        //         method: 'PATCH',
        //         body: JSON.stringify({ title, period, description }),
        //     }
        // )

        // const data = await submitTask.json()

        // if (!submitTask.ok) {
        //     return toast.error('Erro ao atualizar a Tarefa ')
        // }
    }

    return (
        <div className="flex">
            <SideBar />
            <div className="bg-background-task flex w-screen flex-col gap-5 p-5">
                <div className="flex h-auto w-full flex-col gap-5 rounded-2xl bg-white px-16 py-8">
                    <div className="flex flex-col gap-5">
                        <button
                            className="bg-primary-color flex h-10 w-10 cursor-pointer items-center justify-center rounded-4xl p-2 text-white"
                            onClick={HandleBack}
                        >
                            <IconChevronLeft />
                        </button>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <Link
                                    to="/tasks"
                                    className="text-secondary-color"
                                >
                                    Minhas Tarefas
                                </Link>
                                <IconChevronRight className="text-gray-600" />
                                <span>{detailTask?.title}</span>
                            </div>
                            <div className="flex flex-row justify-between">
                                <h1 className="text-2xl font-semibold">
                                    {detailTask?.title}
                                </h1>
                                <Button variant="danger" onClick={HandleDelete}>
                                    <IconTrash className="text-white" />
                                    Deletar Tarefa
                                </Button>
                            </div>
                        </div>

                        {/* FORMS */}
                        <form
                            id="form-updateTask"
                            onSubmit={handleSubmit(HandleSubmitTask)}
                        >
                            <div>
                                <div className="flex w-full flex-col gap-3">
                                    <div className="gap-5 text-start">
                                        <InputDialog
                                            label="Nome da Tarefa: "
                                            id="nameTask"
                                            placeholder="Digite o nome da tarefa"
                                            disabled={updateLoading}
                                            defaultValue={detailTask?.title}
                                            {...register('title', {
                                                required: 'Campo é obrigatório',
                                                validate: (value) => {
                                                    if (!value.trim()) {
                                                        return 'O espaço não pode ser vazio'
                                                    }
                                                    return true
                                                },
                                            })}
                                            error={errors?.title}
                                        />
                                    </div>
                                    <SelectTime
                                        disabled={updateLoading}
                                        defaultValue={detailTask?.period}
                                        {...register('time', {
                                            required: 'Campo é obrigatório',
                                        })}
                                        error={errors?.time}
                                    />
                                    <div>
                                        <InputDialog
                                            label="Descrição: "
                                            id="descriptionTask"
                                            placeholder="Digite o nome da descrição da tarefa"
                                            disabled={updateLoading}
                                            defaultValue={
                                                detailTask?.description
                                            }
                                            {...register('description', {
                                                required: 'Campo é obrigatório',
                                                validate: (value) => {
                                                    if (!value.trim()) {
                                                        return 'O espaço não pode ser vazio'
                                                    }
                                                    return true
                                                },
                                            })}
                                            error={errors?.description}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="flex justify-end gap-3">
                            <Button
                                size="sm"
                                disabled={updateLoading}
                                type="submit"
                                form="form-updateTask"
                            >
                                Salvar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskDetailPage
