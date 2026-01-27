import { useEffect, useState } from 'react'
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
    const [detailTask, setDetailTask] = useState()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            title: '',
            period: 'morning',
            description: '',
        },
    })

    const navigate = useNavigate()

    const HandleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        const fetchTask = async () => {
            const result = await fetch(
                `http://localhost:3000/tasks/${taskId}`,
                {
                    method: 'GET',
                }
            )
            const data = await result.json()
            setDetailTask(data)
            reset(data)
        }
        fetchTask()
    }, [taskId, reset])

    const HandleSubmit = async (data) => {
        const title = data.title
        const period = data.period
        const description = data.description

        const submitTask = await fetch(
            `http://localhost:3000/tasks/${detailTask.id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({ title, period, description }),
            }
        )

        const response = await submitTask.json()

        if (!submitTask.ok) {
            return toast.error('Erro ao atualizar a Tarefa ')
        }
        setDetailTask(response)
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
                                <Button variant="danger">
                                    <IconTrash className="text-white" />
                                    Deletar Tarefa
                                </Button>
                            </div>
                        </div>

                        <div>
                            <div className="flex w-full flex-col gap-3">
                                <form
                                    id="form-update"
                                    onSubmit={handleSubmit(HandleSubmit)}
                                >
                                    <div className="gap-5 text-start">
                                        <InputDialog
                                            label="Nome da Tarefa: "
                                            id="nameTask"
                                            placeholder="Digite o nome da tarefa"
                                            error={errors?.title}
                                            disabled={isSubmitting}
                                            defaultValue={detailTask?.title}
                                            {...register('title', {
                                                required: 'Campo é necessário',
                                                validate: (input) => {
                                                    if (!input.trim()) {
                                                        return 'O campo não pode ser vazio'
                                                    }
                                                    return true
                                                },
                                            })}
                                        />
                                    </div>
                                    <SelectTime
                                        error={errors?.period}
                                        disabled={isSubmitting}
                                        defaultValue={detailTask?.period}
                                        {...register('period', {
                                            required: 'Campo é necessário',
                                            validate: (input) => {
                                                if (!input.trim()) {
                                                    return 'O campo não pode ser vazio'
                                                }
                                                return true
                                            },
                                        })}
                                    />
                                    <div>
                                        <InputDialog
                                            label="Descrição: "
                                            id="descriptionTask"
                                            placeholder="Digite o nome da descrição da tarefa"
                                            error={errors?.description}
                                            disabled={isSubmitting}
                                            defaultValue={
                                                detailTask?.description
                                            }
                                            {...register('description', {
                                                required: 'Campo é necessário',
                                                validate: (input) => {
                                                    if (!input.trim()) {
                                                        return 'O campo não pode ser vazio'
                                                    }
                                                    return true
                                                },
                                            })}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <Button
                        size="sm"
                        form="form-update"
                        onClick={HandleSubmit}
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Salvar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TaskDetailPage
