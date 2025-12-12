const Button = ({ children, variant = 'primary' }) => {
    const defaultButton = () => {
        if (variant === 'primary') {
            return 'bg-cyan-500 text-white'
        }
        if (variant === 'ghost') {
            return 'text-gray-500'
        }
    }

    return (
        <button
            type="button"
            className={`flex w-auto cursor-pointer items-center justify-items-center gap-1 rounded-sm px-2 py-1 text-base font-bold transition delay-50 duration-300 ease-in-out hover:opacity-80 ${defaultButton()}`}
        >
            {children}
        </button>
    )
}

export default Button
