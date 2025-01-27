import { useDispatch, useSelector } from "react-redux";
import { appApi } from "../api";
import { onChecking, onCloseLogin, onLogin, onLogout } from "../store";
import { useSnackbar } from "notistack";


export const useAuthStore = () => {
    const { user, status, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    
    const startLogin = async({email, password}) => {
        dispatch( onChecking() );
        try {
            const {data} = await appApi.post('/login', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            getUserData({email});
            
        } catch ({response}) {
            console.log(response);
            
            dispatch( onLogout(response.data.error));
        }        
    };

    const getUserData = async({email}) => {
        try {
            const {data} = await appApi.post('/user', {email});
            dispatch( onLogin(data.user));
            dispatch( onCloseLogin());
            enqueueSnackbar(`¡Inicio de sesión exitoso, Bienvenido ${data.user.name}!`, {variant: 'success'});
        } catch ({response}) {
            dispatch( onLogout(response.data.error));

        }
    }
    
    return { 
        //* properties
        user, status, errorMessage,
        
        //* Métodos
        startLogin,  
    };
}