function SideBarButtons({icon,children, variant,url}) {

    const getVariantClass = () =>{
        if(variant === 'selected'){
            return "text-cyan-600 rounded-md bg-teal-100"
        }
        if (variant === 'unselected'){
            return ''
        }
    }

    return(
        <a href={url} className={`flex gap-2 fw-auto h-10 pl-3 items-center content-center font-[nunito] ${getVariantClass()}`}> {icon} {children}</a>
    )
}

export default SideBarButtons