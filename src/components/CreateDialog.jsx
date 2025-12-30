import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { toast, Toaster } from 'sonner'
import { v7 as uuidv7 } from 'uuid'

import Button from './Button'
import InputLabel from './InputLabel'
import SelectTime from './SelectTime'

const CreateDialog = ({ isOpen, HandleClickClose, HandleAddtask }) => {
    const [nameTask, setnameTask] = useState('')
    const [periodTask, setperiodTask] = useState('morning')
    const [descriptionTask, setdescriptionTask] = useState('')
    const nodeRef = useRef()

    useEffect(() => {
        if (!isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setnameTask('')
            setperiodTask('morning')
            setdescriptionTask('')
        }
    }, [isOpen])

    const HandleCloseTask = () => {
        HandleClickClose(false)
    }

    const HandleSaveTask = () => {
        if (!nameTask.trim() || !descriptionTask.trim()) {
            return toast.warning('Preencha todos os campos')
        }

        HandleAddtask({
            id: uuidv7(),
            title: nameTask,
            description: descriptionTask,
            period: periodTask,
            status: 'not_started',
        })

        HandleCloseTask()
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
                        className="fixed top-0 bottom-0 flex h-screen w-screen items-center justify-center backdrop-blur-xs"
                    >
                        <Toaster
                            expand="true"
                            visibleToasts={1}
                            theme="system"
                            richColors="true"
                        />
                        <div className="flex size-[500px] flex-col items-center gap-5 rounded-4xl bg-white p-10">
                            <div className="text-center">
                                <h1 className="font-[Poppins] text-4xl">
                                    Nova tarefa
                                </h1>
                                <p>Insira as informações abaixo</p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <div className="gap-5 text-start">
                                    <InputLabel htmlFor="nameTask">
                                        Nome da tarefa:
                                    </InputLabel>
                                    <input
                                        type="text"
                                        id="nameTask"
                                        className="w-full border-1 border-solid border-black/20 p-1.5 font-[Poppins]"
                                        value={nameTask}
                                        onChange={(event) =>
                                            setnameTask(event.target.value)
                                        }
                                        placeholder="Digite o nome da tarefa"
                                    />
                                </div>
                                <SelectTime
                                    value={periodTask}
                                    onChange={(event) =>
                                        setperiodTask(event.target.value)
                                    }
                                />
                                <div>
                                    <InputLabel htmlFor="descriptionTask">
                                        Descrição:
                                    </InputLabel>
                                    <input
                                        type="text"
                                        id="descriptionTask"
                                        className="w-full border-1 border-solid border-black/20 p-1.5 font-[Poppins]"
                                        value={descriptionTask}
                                        onChange={(event) =>
                                            setdescriptionTask(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Digite o nome a descrição tarefa"
                                    />
                                </div>
                            </div>
                            <div className="flex w-100 items-center justify-around gap-5 p-1.5">
                                <Button
                                    variant="ghost"
                                    size="md"
                                    type="button"
                                    onClick={() => {
                                        HandleCloseTask()
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    size="md"
                                    type="button"
                                    onClick={() => {
                                        HandleSaveTask()
                                    }}
                                >
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
