import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children}: any) => {
    const {status} = useSelector((state: RootState) => state.auth);
    
    return (status === 'not-authenticated')
    ? <Navigate to='/auth/login' />
    : children
}

export default PrivateRoutes
