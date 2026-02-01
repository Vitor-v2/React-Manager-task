import { NavLink } from 'react-router'
import { tv } from 'tailwind-variants'

function SideBarButtons({ icon, children, url }) {
    const sidebar = tv({
        base: 'flex items-center gap-2 rounded-lg px-3 py-3',
        variants: {
            color: {
                selected: 'bg-primary-color/70  text-white animate-pulse',
                unselected: 'text-brand-dark-blue',
            },
        },
    })

    return (
        <NavLink
            to={url}
            className={({ isActive }) =>
                sidebar({ color: isActive ? 'selected' : 'unselected' })
            }
        >
            {icon} {children}
        </NavLink>
    )
}

export default SideBarButtons
