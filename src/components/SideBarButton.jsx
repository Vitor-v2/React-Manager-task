import { NavLink } from 'react-router'
import { tv } from 'tailwind-variants'

function SideBarButtons({ icon, children, url }) {
    const sideButton = tv({
        base: 'fw-auto flex h-10 items-center gap-2 pl-3 font-[nunito] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105',
        variants: {
            status: {
                selected: 'text-cyan-600 rounded-md bg-teal-100',
                unselected: '',
            },
        },
        defaultVariants: {
            status: 'unselected',
        },
    })

    return (
        <NavLink
            to={url}
            className={({ isActive }) => {
                sideButton({ status: isActive ? 'selected' : 'unselected' })
            }}
        >
            {icon} {children}
        </NavLink>
    )
}

export default SideBarButtons
