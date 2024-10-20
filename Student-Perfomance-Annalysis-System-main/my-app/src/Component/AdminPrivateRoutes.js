
import { Navigate, Outlet } from 'react-router-dom'

const useAuth = () => {
    const user = JSON.parse(localStorage.getItem('user-token'))
    
    if (user!==0) {
        return true
    } else {
        return false
    }
}

const AdminProtectedRoutes = () => {


    const auth = useAuth()


    return auth ? <Outlet/>: <Navigate to="/"/>
}


export default AdminProtectedRoutes;;