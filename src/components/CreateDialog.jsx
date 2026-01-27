import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast, Toaster } from 'sonner'
import { v7 as uuidv7 } from 'uuid'

import LoaderIcon from '../assets/loader.svg?react'
import Button from './Button'
import InputDialog from './Input'
import SelectTime from './SelectTime'

const CreateDialog = ({ isOpen, HandleClickClose, taskSubmit }) => {
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

    const nodeRef = useRef()

    const HandleCloseTask = () => {
        reset()
        HandleClickClose(false)
    }

    const HandleSaveTask = async (data) => {
        const title = data.title
        const period = data.period
        const description = data.description

        const task = {
            id: uuidv7(),
            title,
            period,
            description,
            status: 'not_started',
        }
        const submitTask = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
        })

        const result = await submitTask.json()

        if (!submitTask.ok) {
            return toast.error('Erro ao criar a Tarefa ')
        }

        taskSubmit(result)
        HandleClickClose()
    }

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={isOpen}
            classNames="animate-add-dialog"
            unmountOnExit
        >
            <div>
                {createPortal(
                    <div
                        ref={nodeRef}
                        className="fixed top-0 bottom-0 flex h-screen w-screen items-center justify-center backdrop-blur-md"
                    >
                        <Toaster
                            expand="true"
                            visibleToasts={1}
                            theme="system"
                            richColors="true"
                        />
                        <div className="flex size-auto w-120 flex-col items-center justify-center gap-5 rounded-4xl bg-gray-50 py-10">
                            <div className="text-center">
                                <h1 className="bg-teste font-[Poppins] text-4xl">
                                    Nova tarefa
                                </h1>
                                <p>Insira as informações abaixo</p>
                            </div>
                            <div className="flex flex-col gap-1 px-15">
                                <form
                                    id="form-dialog"
                                    onSubmit={handleSubmit(HandleSaveTask)}
                                >
                                    <div className="gap-5 text-start">
                                        <InputDialog
                                            label="Nome da Tarefa: "
                                            id="nameTask"
                                            placeholder="Digite o nome da tarefa"
                                            error={errors?.title}
                                            disabled={isSubmitting}
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
                                            placeholder="Digite o nome a descrição tarefa"
                                            error={errors?.description}
                                            disabled={isSubmitting}
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
                            <div className="flex w-100 items-center justify-around gap-5 p-1.5">
                                <Button
                                    variant="secondary"
                                    size="md"
                                    type="button"
                                    onClick={() => {
                                        HandleCloseTask()
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    form="form-dialog"
                                    variant="primary"
                                    size="md"
                                    type="submit"
                                    onClick={() => {
                                        HandleSaveTask()
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <LoaderIcon className="animate-spin text-white" />
                                    ) : null}{' '}
                                    Adicionar
                                </Button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </CSSTransition>
    )
}

export default CreateDialog
