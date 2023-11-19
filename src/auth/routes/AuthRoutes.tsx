import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { RootState } from "../../store/store"
import CheckingAuth from "../../ui/components/CheckingAuth";
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../../firebase/config";
import { login, logout } from "../../store/auth/authSlice";
import PublicRoutes from "./PublicRoutes";
import { startLoadingNotes } from "../../store/auth/thunks";


const AuthRoutes = () => {
  const {status} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    onAuthStateChanged(FirebaseAuth, async (user) => {
      if(!user) return dispatch(logout('There is no user'));

      const {email, displayName, photoURL, uid} = user;
      dispatch(login({email, displayName, photoURL, uid}));
      dispatch<any>(startLoadingNotes());
    });
  }, []);

  if(status === 'checking') {
    return <CheckingAuth />
  }
    return (
      <PublicRoutes>
        <Outlet />
      </PublicRoutes>
    )
}

export default AuthRoutes
