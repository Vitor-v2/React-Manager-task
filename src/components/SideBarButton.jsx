function SideBarButtons({ icon, children, variant, url }) {
    const getVariantClass = () => {
        if (variant === 'selected') {
            return 'text-cyan-600 rounded-md bg-teal-100'
        }
        if (variant === 'unselected') {
            return ''
        }
    }
    return (
        <a
            href={url}
            className={`fw-auto flex h-10 items-center gap-2 pl-3 font-[nunito] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 ${getVariantClass()}`}
        >
            {icon} {children}
        </a>
    )
}

export default SideBarButtons
