import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Navigate } from "react-router-dom";

const PublicRoutes = ({children}: any) => {

    const {status} = useSelector((state: RootState) => state.auth);
    
    return (status === 'authenticated')
    ? <Navigate to='/journal/home' />
    : children
}

export default PublicRoutes
