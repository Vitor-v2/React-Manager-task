import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { toast, Toaster } from 'sonner'

import Button from './Button'
import InputLabel from './InputLabel'

const CreateDialog = ({ isOpen }) => {
    const { openDialog, setopenDialog } = isOpen
    const nodeRef = useRef()
    const newTask = () => {
        const transition = {
            Manhã: 'morning',
            Tarde: 'afternoon',
            Noite: 'evening',
        }

        let nameTask = document.getElementById('nameTask').value
        const periodTask = document.getElementById('hourTask').value
        let descriptionTask = document.getElementById('descriptionTask').value

        if (!transition[periodTask]) return toast.error('Valor inválido')
        const task = {
            title: nameTask,
            description: descriptionTask,
            period: transition[periodTask],
        }
        console.log(task)
        document.getElementById('nameTask').value = ''
        document.getElementById('descriptionTask').value = ''
        toast.success('Enviado com sucesso!!')
        setopenDialog(false)
    }

    return (
        <CSSTransition
            nodeRef={nodeRef}
            in={openDialog}
            timeout={400}
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
                                    />
                                </div>
                                <div className="gap-5 text-start">
                                    <InputLabel htmlFor="periodTask">
                                        Período:
                                    </InputLabel>
                                    <select
                                        id="hourTask"
                                        placeholder="Selecione o período"
                                        className="w-full border-1 border-solid border-black/20 p-1.5 font-[Poppins]"
                                    >
                                        <option value="Manhã">Manhã</option>
                                        <option value="Tarde">Tarde</option>
                                        <option value="Noite">Noite</option>
                                    </select>
                                </div>
                                <div>
                                    <InputLabel htmlFor="descriptionTask">
                                        Descrição:
                                    </InputLabel>
                                    <input
                                        type="text"
                                        id="descriptionTask"
                                        className="w-full border-1 border-solid border-black/20 p-1.5 font-[Poppins]"
                                    />
                                </div>
                            </div>
                            <div className="flex w-100 items-center justify-around gap-5 p-1.5">
                                <Button
                                    variant="ghost"
                                    size="md"
                                    type="button"
                                    onClick={() => {
                                        setopenDialog(false)
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    size="md"
                                    type="button"
                                    onClick={() => newTask()}
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
