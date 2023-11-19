import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import AuthLayout from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { startGoogleSingIn, startLoginWithEmailAndPassword } from '../../store/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useMemo } from 'react';

interface FormData {
  email: string,
  password: string,
}

const formData: FormData = {
    email: '',
    password: '',
}
const LoginPage = () => {

  const { errorMessage, status } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const {email, password, onInputChange} = useForm(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(startLoginWithEmailAndPassword({email, password}));

  }

  const onGoggleSignIn = () => {
    dispatch<any>(startGoogleSingIn());
  }


  return (
    <AuthLayout title={'Login'}>
      <form onSubmit={onSubmit}>
          <Grid container>
            <Grid item xs={12} sx={{marginBottom: 1}}>
              <TextField 
                label='Correo' 
                type='email'
                placeholder='correo@google.com'
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12} sx={{marginBottom: 1}}>
              <TextField 
                label='Contraseña' 
                type='password'
                placeholder='password'
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            <Grid container spacing={1} sx={{marginBottom: 2, marginTop: 1}}>

            <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
              <Alert severity='error'>
                  {errorMessage}
              </Alert>
            </Grid>

              <Grid item xs={12} sm={6} >
                <Button 
                  disabled={isAuthenticating}
                  type='submit' 
                  variant='contained' 
                  fullWidth

                >
                  Login
                </Button>
              </Grid>

              <Grid item xs={12} sm={6} >
                <Button 
                  disabled={isAuthenticating} 
                  variant='contained' 
                  fullWidth 
                  onClick={onGoggleSignIn}
                >
                  <Google />
                  <Typography sx={{marginLeft: 1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/register'>Crear cuenta</Link>
            </Grid>

          </Grid>
        </form>
    </AuthLayout>
  )
}

export default LoginPage
