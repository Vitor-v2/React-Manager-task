import InputLabel from './InputLabel'

const InputDialog = ({ label, ...rest }) => {
    return (
        <>
            <InputLabel htmlfor={rest.id}>{label}</InputLabel>
            <input
                type="text"
                id={rest.id}
                className="w-full border-1 border-solid border-black/20 p-1.5 font-[Poppins]"
                {...rest}
            />
            {rest.error && (
                <span className="text-start text-sm text-red-500">
                    {rest.error.message}
                </span>
            )}
        </>
    )
}

export default InputDialog
