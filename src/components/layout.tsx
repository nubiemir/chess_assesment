import { memo } from "react"
import { Outlet } from "react-router-dom"
import NavigationHeader from "./navigation-header"



const Layout = () => {
    return (
        <div className="h-screen">
            <div className="bg-base-300">
                <NavigationHeader />
            </div>
            <div className="w-[100vw] max-w-[1600px] mx-auto">
                <Outlet />
            </div>
        </div>
    )
}



export default memo(Layout)