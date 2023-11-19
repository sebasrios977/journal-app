import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField } from "@mui/material"
import AuthLayout from "../layout/AuthLayout"
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth/thunks';
import { Form } from '../../interfaces/form.interface';
import { RootState } from '../../store/store';

const formValidations = {
  email: [(value: string) => value.includes('@'), 'Debe ser un correo electronico'],
  password: [(value: string) => value.length >= 6, 'Debe de contener como minimo 6 letras'],
  displayName: [(value: string) => value.length >= 1, 'Debe de poner un nombre'],
}

const formData: Form = {
  email: '',
  password: '',
  displayName: '',
}

const RegisterPage = () => {

  const dispatch = useDispatch();
  const {errorMessage, status} = useSelector((state: RootState) => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {displayName, email, password,
        displayNameValid, emailValid, passwordValid, isFormValid,
        onInputChange} = useForm(formData, formValidations);
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    
    dispatch<any>(startCreatingUserWithEmailAndPassword({email, password, displayName}));
  }

  return (
    <AuthLayout title={'Register'}>
      <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{marginBottom: 1}}>
              <TextField 
                label='Nombre' 
                type='text'
                placeholder='John Doe'
                fullWidth
                name='displayName'
                onChange={onInputChange}
                value={displayName}
                error={!!displayNameValid && formSubmitted}
                helperText={formSubmitted && displayNameValid}
              />
            </Grid>
            <Grid item xs={12} sx={{marginBottom: 1}}>
              <TextField 
                label='Correo' 
                type='email'
                placeholder='johndoe@google.com'
                fullWidth
                name='email'
                onChange={onInputChange}
                value={email}
                error={!!emailValid && formSubmitted}
                helperText={formSubmitted && emailValid}
              />
            </Grid>
            <Grid item xs={12} sx={{marginBottom: 1}}>
              <TextField 
                label='Contraseña' 
                type='password'
                placeholder='Password'
                fullWidth
                name='password'
                onChange={onInputChange}
                value={password}
                error={!!passwordValid && formSubmitted}
                helperText={formSubmitted && passwordValid}
              />
            </Grid>

            <Grid container spacing={1} sx={{marginBottom: 2, marginTop: 1}}>
              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity='error'>
                  {errorMessage}
                </Alert>
              </Grid>

              <Grid item xs={12} >
                <Button 
                  disabled={isCheckingAuthentication}
                  type='submit' 
                  variant='contained' 
                  fullWidth
                >
                  Crear Cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/login'>¿Ya tienes cuenta?</Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}

export default RegisterPage
