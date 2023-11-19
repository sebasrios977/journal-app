import { Dispatch, Action } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { Note, addNewEmptyNote, deleteNoteById, noteUpdated, savingNewNote, setActiveNote, setPhotosToActiveNote, setSaving } from "./journalSlice";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async(dispatch: Dispatch<Action>, getState: any) => {
        dispatch(savingNewNote());
        const { uid } = getState().auth;

        const newNote: Note = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startSaveNote = () => {
    return async(dispatch: Dispatch<Action>, getState: any) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const {active} = getState().journal;
        
        const noteToFirestore = {...active};
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`);
        await setDoc(docRef, noteToFirestore, {merge: true});
        dispatch(noteUpdated(active));
    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch: Dispatch<Action>) => {
        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async(dispatch: Dispatch<Action>, getState: any) => {

        const {uid} = getState().auth;
        const {active} = getState().journal;
        
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`);
        await deleteDoc(docRef);
        
        dispatch(deleteNoteById(active.id));

    }
}

