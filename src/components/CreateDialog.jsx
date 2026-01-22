import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { toast, Toaster } from 'sonner'
import { v7 as uuidv7 } from 'uuid'

import LoaderIcon from '../assets/loader.svg?react'
import Button from './Button'
import InputDialog from './Input'
import SelectTime from './SelectTime'

const CreateDialog = ({ isOpen, HandleClickClose, taskSubmit }) => {
    const [errorsTask, seterrorsTask] = useState([])
    const [isLoading, setisLoading] = useState(false)

    const nodeRef = useRef()
    const nameTask = useRef()
    const periodTask = useRef()
    const descriptionTask = useRef()

    const HandleCloseTask = () => {
        HandleClickClose(false)
        seterrorsTask([])
    }

    const HandleSaveTask = async () => {
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
            return
        }

        setisLoading(true)
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
        setisLoading(false)
        HandleClickClose()
    }

    const errorName = errorsTask.find((error) => error.inputError === 'name')
    const errorPeriod = errorsTask.find(
        (error) => error.inputError === 'period'
    )
    const errorDescription = errorsTask.find(
        (error) => error.inputError === 'description'
    )

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
                                <div className="gap-5 text-start">
                                    <InputDialog
                                        label="Nome da Tarefa: "
                                        id="nameTask"
                                        placeholder="Digite o nome da tarefa"
                                        error={errorName}
                                        ref={nameTask}
                                        disabled={isLoading}
                                    />
                                </div>
                                <SelectTime
                                    ref={periodTask}
                                    error={errorPeriod}
                                    disabled={isLoading}
                                />

                                <div>
                                    <InputDialog
                                        label="Descrição: "
                                        id="descriptionTask"
                                        ref={descriptionTask}
                                        placeholder="Digite o nome a descrição tarefa"
                                        error={errorDescription}
                                        disabled={isLoading}
                                    />
                                </div>
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
                                    variant="primary"
                                    size="md"
                                    type="button"
                                    onClick={() => {
                                        HandleSaveTask()
                                    }}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
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
