import { useEffect, useRef, useState } from 'react'
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
    const [errorsTask, seterrorsTask] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const [detailTask, setDetailTask] = useState()

    const nameTask = useRef()
    const periodTask = useRef()
    const descriptionTask = useRef()

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
        }

        fetchTask()
    }, [taskId])

    const HandleSubmit = async () => {
        const newErrors = []
        const title = nameTask.current.value
        const period = periodTask.current.value
        const description = descriptionTask.current.value

        if (!title.trim()) {
            newErrors.push({
                inputError: 'name',
                message: 'O nome da tarefa não pode estar vazio.',
            })
        }

        if (!period.trim()) {
            newErrors.push({
                inputError: 'period',
                message: 'O período da tarefa não pode estar vazio.',
            })
        }

        if (!description.trim()) {
            newErrors.push({
                inputError: 'description',
                message: 'A descrição não pode estar vazia.',
            })
        }

        seterrorsTask(newErrors)

        if (newErrors.length > 0) {
            return setisLoading(false)
        }

        setisLoading(true)

        const submitTask = await fetch(
            `http://localhost:3000/tasks/${detailTask.id}`,
            {
                method: 'PATCH',
                body: JSON.stringify({ title, period, description }),
            }
        )

        const data = await submitTask.json()

        if (!submitTask.ok) {
            setisLoading(false)
            return toast.error('Erro ao atualizar a Tarefa ')
        }
        setDetailTask(data)
        setisLoading(false)
    }

    const errorName = errorsTask.find((error) => error.inputError === 'name')
    const errorPeriod = errorsTask.find(
        (error) => error.inputError === 'period'
    )
    const errorDescription = errorsTask.find(
        (error) => error.inputError === 'description'
    )

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
                                <div className="gap-5 text-start">
                                    <InputDialog
                                        label="Nome da Tarefa: "
                                        id="nameTask"
                                        placeholder="Digite o nome da tarefa"
                                        ref={nameTask}
                                        error={errorName}
                                        disabled={isLoading}
                                        defaultValue={detailTask?.title}
                                    />
                                </div>
                                <SelectTime
                                    error={errorPeriod}
                                    disabled={isLoading}
                                    defaultValue={detailTask?.period}
                                    ref={periodTask}
                                />
                                <div>
                                    <InputDialog
                                        label="Descrição: "
                                        id="descriptionTask"
                                        placeholder="Digite o nome da descrição da tarefa"
                                        error={errorDescription}
                                        disabled={isLoading}
                                        defaultValue={detailTask?.description}
                                        ref={descriptionTask}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <Button
                        size="sm"
                        onClick={HandleSubmit}
                        disabled={isLoading}
                    >
                        Salvar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TaskDetailPage
