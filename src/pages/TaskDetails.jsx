import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router'
import { toast } from 'sonner'

import { IconChevronLeft, IconChevronRight, IconTrash } from '../assets/Icons'
import { IconLoading } from '../assets/Icons'
import Button from '../components/Button'
import InputDialog from '../components/Input'
import SelectTime from '../components/SelectTime'
import SideBar from '../components/SideBar'
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { useGetTask } from '../hooks/data/use-get-task'
import { useUpdateTask } from '../hooks/data/use-update-taks'

const TaskDetailPage = () => {
    const { taskId } = useParams()
    const queryClient = useQueryClient()
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: { title: '', period: 'morning', description: '' },
    })
    const navigate = useNavigate()

    const { data: detailTask } = useGetTask(taskId, reset)
    const { mutate: deleteMutate, isPending: reloadingDelete } =
        useDeleteTask(taskId)
    const { mutate: updateMutate, isPending: submitLoading } =
        useUpdateTask(taskId)

    const HandleBack = () => {
        reset()
        navigate(-1)
    }

    const HandleDelete = () => {
        deleteMutate(undefined, {
            onSuccess: (taskId) => {
                queryClient.setQueryData(['getTaskDetail'], (oldTasks) => {
                    taskId !== oldTasks.id
                })
                // navigate(-1)
                toast.success('Tarefa deletada com sucesso!')
            },
            onError: (error) => {
                throw new Error(error)
            },
        })
    }

    const HandleSubmitTask = async (dataUpdate) => {
        const title = dataUpdate.title
        const period = dataUpdate.period
        const description = dataUpdate.description

        const updateTask = { title, period, description }

        updateMutate(updateTask, {
            onSuccess: () => {
                // navigate(-1)
                toast.success('Tarefa alterada')
            },
            onError: (error) => {
                throw new Error(error)
            },
        })
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
                                <Button
                                    variant="danger"
                                    onClick={HandleDelete}
                                    disabled={submitLoading || reloadingDelete}
                                >
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
                                            disabled={
                                                submitLoading || reloadingDelete
                                            }
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
                                        disabled={
                                            submitLoading || reloadingDelete
                                        }
                                        defaultValue={detailTask?.period}
                                        {...register('period', {
                                            required: 'Campo é obrigatório',
                                        })}
                                        error={errors?.time}
                                    />
                                    <div>
                                        <InputDialog
                                            label="Descrição: "
                                            id="descriptionTask"
                                            placeholder="Digite o nome da descrição da tarefa"
                                            disabled={
                                                submitLoading || reloadingDelete
                                            }
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
                                disabled={submitLoading || reloadingDelete}
                                type="submit"
                                form="form-updateTask"
                            >
                                {submitLoading | reloadingDelete ? (
                                    <IconLoading className="animate-spin text-white" />
                                ) : null}
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
