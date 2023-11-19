import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { Form } from "../interfaces/form.interface";
import { Login } from "../interfaces/login.interface";

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName, email, photoURL, uid} = result.user;

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid,
        }
        
    } catch (error: any) {
        console.log(error);

        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        
        return {
            ok: false,
            errorCode,
            errorMessage,
            credential,
        }
    }
}


export const registerUserWithEmailAndPassword = async({email, password, displayName}: Form) => {
    
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {photoURL, uid} = result.user;
        await updateProfile(FirebaseAuth.currentUser!, {displayName});
        
        return {
            ok: true,
            email,
            displayName,
            photoURL,
            uid,
            
        }

    } catch (error: any) {
        console.log(error)
        const errorMessage = error.message;

      return {
        ok: false,
        errorMessage,
      }  
    }
}

export const loginWithEmailAndPassword = async ({email, password}: Login) => {

    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { photoURL, displayName, uid } = result.user;
        return {
            ok: true,
            email,
            password,
            photoURL,
            displayName,
            uid,
        }
    } catch (error: any) {
        console.log(error);
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage,
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}