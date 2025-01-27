import { Alert, Button, Drawer, Grid2, TextField, Typography } from "@mui/material"
import { useAuthStore, useForm } from "../hooks"
import { useDispatch, useSelector, } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { onCloseLogin, onLogout, resetErrorMessage } from "../store";

export const Login = () => {

  const dispatch = useDispatch();

  const {status, errorMessage, startLogin} = useAuthStore();
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status]);

  const { isLoginOpen }= useSelector( state => state.ui);

  const formData = { email: '', password: '' };
  const formValidations = {
    email: [(value) => (value.length > 0 ), 'El correo es requerido'],
    password: [(value) => (value.length > 0 ), 'El correo es requerido'],
  };

  const {
    formState, email, password, onInputChange,
    isFormValid, emailValid, passwordValid, onResetForm
  } = useForm(formData, formValidations);

  const [formSubmitted, setFormSubmitted] = useState(false)

  const onLogin = (e) => {
    e.preventDefault();
    setFormSubmitted(true); 

    if (!isFormValid) return; 
     
    startLogin({email, password});
  }

  const onCloseDrawer = () => {
    dispatch( onCloseLogin());
  }

  useEffect(() => {
    if (!isLoginOpen) {
      onResetForm();
      setFormSubmitted(false);
      dispatch(resetErrorMessage())  
    }
  }, [isLoginOpen]);
    
  return (
    <Drawer
        anchor={'right'}
        open={isLoginOpen}
        onClose={onCloseDrawer}
        
        sx={{ bgcolor: 'transparent',
           '& .MuiDrawer-paper': { backgroundColor: 'transparent',
                                  width:{xs:'100%', sm:'auto'},
                                  } 
          }}
      >
        <Grid2
          container
          spacing={0}
          direction={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          size={{xs:12}}
          sx={{ minHeight: '100vh', bgcolor:'primary.main', padding:4, opacity: 0.8 }}
        >
          <Grid2
            // size={{xs:3}}
            boxShadow={3}
            maxWidth={'350px'}
            sx={{ backgroundColor:'white', padding:3, borderRadius: 2, opacity: 1 }}
          >
            <Typography textAlign={'center'} variant={'h5'} sx={{mb:1}}>Login</Typography>
            <form onSubmit={onLogin}>
              <Grid2 container>
                <Grid2 size={{xs:12}} sx={{mt:2}}>
                  <TextField
                    label="Correo"
                    type="email"
                    fullWidth
                    placeholder="Correo"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                    error={!!emailValid && formSubmitted}
                    helperText={formSubmitted && emailValid}
                  />
                </Grid2>
                <Grid2 size={{xs:12}} sx={{mt:2}}>
                  <TextField
                    label="Contraseña"
                    type="password"
                    fullWidth
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={onInputChange }
                    error={!!passwordValid && formSubmitted}
                    helperText={formSubmitted && passwordValid}
                  />
                </Grid2>
                <Grid2 size={{xs:12}} sx={{mt:2}} display={ !!errorMessage || !isLoginOpen ? '' : 'none'}>
                  <Alert severity="error"> { errorMessage }</Alert>
                </Grid2>
                <Grid2 container width={'100%'} sx={{mt:2, mb:1}}>
                  <Grid2 size={{xs:12}}>
                    <Button disabled={ isCheckingAuthentication } type="submit" variant="contained" fullWidth>Iniciar sesión</Button>
                  </Grid2>
                </Grid2>
              </Grid2>
            </form>
          </Grid2>
        </Grid2> 
        
      </Drawer>
  )
}
