import { tv } from 'tailwind-variants'

const Button = ({ children, variant, size, className, ...rest }) => {
    const button = tv({
        base: 'flex w-auto cursor-pointer items-center justify-items-center gap-1 rounded-sm text-base font-bold duration-700',
        variants: {
            variant: {
                primary:
                    'bg-primary-color text-white ease-in-out hover:opacity-80',
                ghost: 'text-gray-500 border-transparent hover:border-gray-500/75 hover:border',
                secondary:
                    'bg-gray-500 text-white ease-in-out hover:opacity-80 border-black',
            },
            size: {
                sm: 'px-2 py-1',
                md: 'px-10 py-4',
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
            className={button({ variant, size, className })}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button
