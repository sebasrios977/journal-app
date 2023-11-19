import { Action, Dispatch } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from "./authSlice";
import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../firebase/providers";
import { Login } from "../../interfaces/login.interface";
import { loadNotes } from "../../helpers/loadNotes";
import { clearNotesLogOut, setNotes } from "../journal/journalSlice";


export const checkingAuthentication = () => {
    return async(dispatch: Dispatch<Action>) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSingIn = () => {
    return async(dispatch: Dispatch<Action>) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if(!result.ok) return dispatch(logout(result));
        
        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailAndPassword = ({email, password, displayName}: any) => {
    return async(dispatch: Dispatch<Action>) => {
        dispatch( checkingCredentials() );

        const result = await registerUserWithEmailAndPassword({email, password, displayName});
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
    }
}

export const startLoginWithEmailAndPassword = ({email, password}: Login) => {
    return async(dispatch: Dispatch<Action>) => {
        dispatch(checkingCredentials());

        const result = await loginWithEmailAndPassword({email, password});
        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result));
        
    }
}

export const startLogOut = () => {
    return async(dispatch: Dispatch<Action>) => {
        await logoutFirebase();
        dispatch(clearNotesLogOut());
        dispatch(logout({}));
    }
}

export const startLoadingNotes = () => {
    return async(dispatch: Dispatch<Action>, getState: any) => {
        
        const {uid} = getState().auth;
        if (!uid) throw new Error('No existe el uid');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}