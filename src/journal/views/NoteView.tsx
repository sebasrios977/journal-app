import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, Typography, TextField, IconButton } from '@mui/material';
import ImageGallery from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

const NoteView = () => {

    const dispatch = useDispatch();
    const {active, savedMessage, isSaving} = useSelector((state: RootState) => state.journal);
    const {title, body, onInputChange, date, formState} = useForm(active);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch<any>(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if(savedMessage.length > 0) {
            Swal.fire('Nota actualizada', savedMessage, 'success');
        }
    }, [savedMessage]);


    const onSaveNote = () => {
        dispatch<any>(startSaveNote());
    }

    const onFileInputChange = ({target}: any) => {
        if(target.files === 0) return;
        dispatch<any>(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch<any>(startDeletingNote());
    }


  return (
    <Grid container direction='row' justifyContent='space-between' sx={{marginBottom: 1}}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
        </Grid>

        <Grid item>

            <input 
                type='file'
                multiple
                onChange={onFileInputChange}
                style={{display: 'none'}}
                ref={fileInputRef}
            />

            <IconButton
                color='primary'
                disabled={isSaving}
                onClick={() => fileInputRef.current?.click()}
            >
                <UploadOutlined />
            </IconButton>

            <Button 
                disabled={isSaving}
                onClick={onSaveNote} 
                color='primary' 
                sx={{padding: 2}}>
                <SaveOutlined sx={{fontSize: 30, marginRight: 1}} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant="filled"
                fullWidth
                placeholder="Ingresa un titulo"
                label='Titulo'
                sx={{border: 'none', marginBottom: 1}}
                name='title'
                value={title}
                onChange={onInputChange}
            />
            <TextField 
                type='text'
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Que sucedió en el día de hoy?"
                label='Reseña'
                minRows={5}
                name='body'
                value={body}
                onChange={onInputChange}
            />
        </Grid>
        <Grid 
            container
            justifyContent='end'
        >
            <Button
                onClick={onDelete}
                sx={{mt: 2}}
                color='error'
            >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>

        <ImageGallery images={active?.imageUrls} />
    </Grid>
  )
}

export default NoteView
