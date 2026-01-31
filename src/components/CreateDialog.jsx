import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v7 as uuidv7 } from 'uuid'

import LoaderIcon from '../assets/loader.svg?react'
import Button from './Button'
import InputDialog from './Input'
import SelectTime from './SelectTime'

const CreateDialog = ({ isOpen, HandleClickClose }) => {
    const { mutate, isPending: relodingSaveTask } = useMutation({
        mutationKey: 'submit-task',
        mutationFn: async (task) => {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
            })
            if (!response.ok) {
                throw new Error()
            }

            return response.json()
        },
    })

    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: { title: '', period: 'morning', description: '' },
    })
    const nodeRef = useRef()
    const queryClient = useQueryClient()

    const HandleCloseTask = () => {
        reset()
        HandleClickClose(false)
    }

    const HandleSaveTask = async (data) => {
        const task = {
            id: uuidv7(),
            title: data.title,
            period: data.period,
            description: data.description,
            status: 'not_started',
        }

        mutate(task, {
            onSuccess: () => {
                queryClient.setQueryData(['tasks'], (currentTask) => {
                    return [...currentTask, task]
                })
                toast.success('Tarefa adicionada!')
                reset()
                HandleClickClose()
            },
            onError: () => {
                toast.error('Não foi possível adicionar a tarefa')
            },
        })
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
                        <div className="flex size-auto w-120 flex-col items-center justify-center gap-5 rounded-4xl bg-gray-50 py-10">
                            <div className="text-center">
                                <h1 className="bg-teste font-[Poppins] text-4xl">
                                    Nova tarefa
                                </h1>
                                <p>Insira as informações abaixo</p>
                            </div>
                            <form
                                id="form-Createtask"
                                onSubmit={handleSubmit(HandleSaveTask)}
                            >
                                <div className="flex flex-col gap-1 px-15">
                                    <div className="gap-5 text-start">
                                        <InputDialog
                                            label="Nome da Tarefa: "
                                            id="nameTask"
                                            error={errors?.title}
                                            disabled={relodingSaveTask}
                                            {...register('title', {
                                                required:
                                                    'O campo não pode ser vazio.',
                                                validate: (value) => {
                                                    !value.trim()
                                                        ? 'O campo não pode ser vazio'
                                                        : true
                                                },
                                            })}
                                            placeholder="Digite o nome da tarefa"
                                        />
                                    </div>
                                    <SelectTime
                                        error={errors?.period}
                                        disabled={relodingSaveTask}
                                        {...register('period', {
                                            required:
                                                'O campo não pode ser vazio.',
                                            validate: (value) => {
                                                !value.trim()
                                                    ? 'O campo não pode ser vazio'
                                                    : true
                                            },
                                        })}
                                        placeholder="morning"
                                    />

                                    <div>
                                        <InputDialog
                                            label="Descrição: "
                                            id="descriptionTask"
                                            error={errors?.description}
                                            disabled={relodingSaveTask}
                                            {...register('description', {
                                                required:
                                                    'O campo não pode ser vazio.',
                                                validate: (value) => {
                                                    !value.trim()
                                                        ? 'O campo não pode ser vazio'
                                                        : true
                                                },
                                            })}
                                            placeholder="Digite a descrição da tarefa"
                                        />
                                    </div>
                                </div>
                            </form>

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
                                    form="form-Createtask"
                                    variant="primary"
                                    size="md"
                                    type="submit"
                                    onClick={() => {
                                        HandleSaveTask()
                                    }}
                                    disabled={relodingSaveTask}
                                >
                                    {relodingSaveTask ? (
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
