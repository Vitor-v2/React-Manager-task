const InputLabel = (props) => {
    return (
        <label
            className="font-[Poppins] text-sm font-semibold text-black"
            {...props}
        >
            {props.children}
        </label>
    )
}
export default InputLabel
