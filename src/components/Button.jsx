import { tv } from 'tailwind-variants'

const Button = ({ children, variant, size, className, ...rest }) => {
    const button = tv({
        base: 'flex justify-center items-center cursor-pointer gap-1 rounded-sm font-bold duration-700',
        variants: {
            variant: {
                primary:
                    'bg-primary-color text-white text-center hover:opacity-70',
                ghost: 'text-gray-500 border-transparent hover:border-gray-500/75 hover:border',
                secondary:
                    'bg-gray-300 text-black/60 ease-in-out hover:opacity-60',
                danger: 'bg-red-500 text-white transition hover:opacity-60',
            },
            size: {
                sm: 'px-2 py-1',
                md: 'px-10 py-2',
                lg: 'px-20 py-2',
            },
            disabled: {
                true: 'opacity-70 cursor-not-allowed',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'sm',
        },
    })

    return (
        <button
            type="button"
            className={button({
                variant,
                size,
                disabled: rest.disabled,
                className,
            })}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
