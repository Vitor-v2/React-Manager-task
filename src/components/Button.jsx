const Button = ({ children, variant = 'primary', size = 'sm', ...rest }) => {
    const defaultButton = () => {
        if (variant === 'primary') {
            return 'bg-cyan-500 text-white ease-in-out hover:opacity-80'
        }
        if (variant === 'ghost') {
            return 'text-gray-500 border-transparent hover:border-gray-500/75 hover:border'
        }
    }
    const defaultSize = () => {
        if (size === 'sm') {
            return 'px-2 py-1'
        }
        if (size === 'md') {
            return 'px-10 py-5'
        }
    }

    return (
        <button
            type="button"
            className={`flex w-auto cursor-pointer items-center justify-items-center gap-1 rounded-sm text-base font-bold duration-700 ${defaultButton()} ${defaultSize()}`}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
