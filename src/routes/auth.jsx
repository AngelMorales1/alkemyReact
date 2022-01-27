import { Navigate, Outlet } from "react-router-dom"

const UserAuth = ()=>{
    const isAuth = localStorage.getItem("token")
    return isAuth ? <Outlet/> : <Navigate to="/login"/>
}

export default UserAuth;