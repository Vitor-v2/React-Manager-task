import InputLabel from './InputLabel'

const InputDialog = ({ label, ...rest }) => {
    return (
        <div>
            <InputLabel htmlFor={rest.id}>{label}</InputLabel>
            <input
                type="text"
                id={rest.id}
                className="w-full border border-solid border-black/20 p-1.5 font-[Poppins]"
                {...rest}
            />
            {rest.error && (
                <span className="text-sm text-red-500">
                    {rest.error.message}
                </span>
            )}
        </div>
    )
}

export default InputDialog
