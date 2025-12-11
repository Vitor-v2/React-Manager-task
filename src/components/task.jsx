import { useState } from "react"

export default function Task(){
    const [listTask, setListTask] = useState([])
    const [inputTask, setInputTask] = useState('')

    return(
        <div>
            <label htmlFor="inputTask">Nome da tarefa</label>
            <input type="text" className="" id='inputTask'value={inputTask} onChange={(e)=>{setInputTask(e.target.value)}}/>

            <button type="button" onClick={()=>{setListTask([...listTask,inputTask])}} >
                Enviar
            </button>

            <div className="w-2xl bg-amber-100 ">
            <p className="text-center">Lista</p>
            <ul>{listTask.map((value, index)=><li>{index + 1} - {value}</li>)}</ul>
            </div>
        </div>
    )
}