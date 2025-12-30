import InputLabel from './InputLabel'

const SelectTime = (props) => {
    return (
        <div className="gap-5 text-start">
            <InputLabel htmlFor="periodTask">Período:</InputLabel>
            <select
                id="hourTask"
                placeholder="Selecione o período"
                className="w-full border-1 border-solid border-black/20 p-1.5 font-[Poppins]"
                {...props}
            >
                <option value="morning">Manhã</option>
                <option value="afternoon">Tarde</option>
                <option value="evening">Noite</option>
            </select>
        </div>
    )
}

export default SelectTime
