import { Autocomplete, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid2, TextField } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { onToggleForm, resetSelectedBranch } from '../store';
import { appApi } from '../api';
import { enqueueSnackbar } from 'notistack';
import { useBranchesStore, useForm } from '../hooks';
import { getBase64FromImageUrl, getEnvVariables } from '../helpers';

export const FormModal = () => {
    const dataInitial = {
        nombre : '',
        email : '',
        descripcion : '',
        telefono : '',
        direccion : '',
        imagen : '',
    }

    const [formData, setFormData] = useState(dataInitial);

    const formValidations = {
        nombre: [(value) => (value.length > 0 ), 'El nombre es requerido'],
        email: [(value) => (value.length > 0 ), 'El correo es requerido'],
        descripcion: [(value) => (value.length > 0 ), 'La descripción es requerida'],
        telefono: [(value) => (value.length > 0 ), 'El teléfono es requerido'],
        direccion: [(value) => (value.length > 0 ), 'La dirección es requerida'],
        imagen: [(value) => (value.length > 0 ), 'La imagen es requerida'],
    };

    const {
        formState,
        onInputChange,
        isFormValid,
        nombreValid,
        emailValid,
        descripcionValid,
        telefonoValid,
        direccionValid,
        imagenValid,
        onResetForm
    } = useForm(formData, formValidations);

    const [formSubmitted, setFormSubmitted] = useState(false)

    const [paises, setPaises] = useState([]);
    const [estados, setEstados] = useState([]);
    const [ciudades, setCiudades] = useState([]);
  
    const [loadingPaises, setLoadingPaises] = useState(false);
    const [loadingEstados, setLoadingEstados] = useState(false);
    const [loadingCiudades, setLoadingCiudades] = useState(false);
  
    const [paisSeleccionado, setPaisSeleccionado] = useState(null);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
    const [ciudadSeleccionado, setCiudadSeleccionado] = useState(null);

    const [imagePreview, setImagePreview] = useState(null);

    const {selectedBranch, createBranch, editBranchById} = useBranchesStore();
    const {formAction} = useSelector((state)=>state.ui);

    const dispatch = useDispatch();

    const {VITE_STORAGE_URL} = getEnvVariables();


  
    // 1. Cargar países al montar el componente
    useEffect(() => {
      const fetchPaises = async () => {
        setLoadingPaises(true);
        try {
            const resp = await appApi.get('/paises');
            const data = resp.data.data;
            const listPaises = Object.keys(data).map((key)=>{
                return {...data[key], label: data[key].name }
            })
            setPaises(listPaises);
            
        } catch ({response}) {
            console.log(response);
            enqueueSnackbar(`Error al obtener la lista de paises`, {variant: 'error'});
        }finally{

            setLoadingPaises(false);
        }
      };
  
      fetchPaises();
    }, []);
  
    // 2. Cargar departamentos al cambiar el país seleccionado
    useEffect(() => {
      if (!paisSeleccionado) return;
  
      const fetchDepartamentos = async () => {
        setLoadingEstados(true);
        try {
            const resp = await appApi.get(`/departamentos/${paisSeleccionado.id}`);
            const data = resp.data.data;
            const listEstados = Object.keys(data).map((key)=>{
                return {...data[key], label:data[key].name}
            })
            
            setEstados(listEstados);

            if (selectedBranch && formAction === 'edit') {
                const estadoSelectedBranch = estados.find((estado)=>selectedBranch.estado_id === estado.id);
                setEstadoSeleccionado(estadoSelectedBranch  || null);
            }
            
        } catch ({response}) {
            console.log(response);
            enqueueSnackbar(`Error al obtener la lista de estados`, {variant: 'error'});
        } finally {
            setLoadingEstados(false);
        }

      };
  
      fetchDepartamentos();
    }, [paisSeleccionado]);
  
    // 3. Cargar ciudades al cambiar el departamento seleccionado
    useEffect(() => {
      if (!estadoSeleccionado) return;
  
      const fetchCiudades = async () => {
        setLoadingCiudades(true);
        try {
            const resp = await appApi.get(`/ciudades/${estadoSeleccionado.id}`);
            const data = resp.data.data;
            const listCiudades = Object.keys(data).map((key)=>{
                return {...data[key], label:data[key].name}
            })
            setCiudades(listCiudades);

            if (selectedBranch && formAction === 'edit') {
                const ciudadSelectedBranch = ciudades.find((ciudad)=>selectedBranch.ciudad_id === ciudad.id);
                setCiudadSeleccionado(ciudadSelectedBranch  || null);
            }

        } catch ({response}) {
            console.log(response);
            enqueueSnackbar(`Error al obtener la lista de ciudades`, {variant: 'error'});
        }finally {
            setLoadingCiudades(false);
        }
      };
  
      fetchCiudades();
    }, [estadoSeleccionado]);

    useEffect(() => {
        onResetForm();
        setFormData(dataInitial);
        setCiudadSeleccionado(null);
        setPaisSeleccionado(null);
        setEstadoSeleccionado(null);
        setFormSubmitted(false);
        setImagePreview(null);

      if (selectedBranch && formAction === 'edit') {
        const paisSelectedBranch = paises.find((pais)=>selectedBranch.pais_id === pais.id);
        setPaisSeleccionado(paisSelectedBranch || null);

        const selectedBranchFormData = {};
        Object.keys(formData).forEach((key)=>{
            selectedBranchFormData[key]=selectedBranch[key];
        });

        // Cargar la imagen desde la URL y mostrar una vista previa
        const imageUrl = `${VITE_STORAGE_URL}/${selectedBranch.imagen}`;
        setImagePreview(imageUrl);


        setFormData(selectedBranchFormData);

      }
    //   if(!formAction){
        
    //   }
    }, [formAction])

    useEffect(() => {
        if (selectedBranch && formAction === 'edit' && paisSeleccionado) {
          const fetchDepartamentos = async () => {
            setLoadingEstados(true);
            try {
              const resp = await appApi.get(`/departamentos/${paisSeleccionado.id}`);
              const data = resp.data.data;
              const listEstados = Object.keys(data).map((key) => {
                return { ...data[key], label: data[key].name };
              });
    
              setEstados(listEstados);
    
              const estadoSelectedBranch = listEstados.find((estado) => selectedBranch.estado_id === estado.id);
              setEstadoSeleccionado(estadoSelectedBranch || null);
            } catch ({ response }) {
              console.log(response);
              enqueueSnackbar(`Error al obtener la lista de estados`, { variant: 'error' });
            } finally {
              setLoadingEstados(false);
            }
          };
    
          fetchDepartamentos();
        }
      }, [selectedBranch, formAction, paisSeleccionado]);

      useEffect(() => {
        if (selectedBranch && formAction === 'edit' && estadoSeleccionado) {
          const fetchCiudades = async () => {
            setLoadingCiudades(true);
            try {
              const response = await appApi.get(`/ciudades/${estadoSeleccionado.id}`);
              const data = response.data.data;
              const listCiudades = Object.keys(data).map((key) => {
                return { ...data[key], label: data[key].name };
              });
    
              setCiudades(listCiudades);
    
              const ciudadSelectedBranch = listCiudades.find((ciudad) => selectedBranch.ciudad_id === ciudad.id);
              setCiudadSeleccionado(ciudadSelectedBranch || null);
            } catch ({ response }) {
              console.log(response);
              enqueueSnackbar(`Error al obtener la lista de ciudades`, { variant: 'error' });
            } finally {
              setLoadingCiudades(false);
            }
          };
    
          fetchCiudades();
        }
      }, [selectedBranch, formAction, estadoSeleccionado]);
    

  
    const handleClose = () => {
      dispatch(onToggleForm(null));
    };

    const onSubmitForm = async (event) => {
        event.preventDefault();
        setFormSubmitted(true); 
        
        if(!isFormValid || !ciudadSeleccionado) return;

        
        const dataForm = {
            ...formState,
            city_id: ciudadSeleccionado.id,
            latitud: Number(ciudadSeleccionado.latitude),
            longitud: Number(ciudadSeleccionado.longitude)
        }
        
        if (!formState.imagenBase64) {
            dataForm.imagen = await getBase64FromImageUrl(imagePreview);
        }else {
            dataForm.imagen = dataForm.imagenBase64
            delete dataForm.imagenBase64;

        }

        if (formAction === 'create') {
            createBranch(dataForm);
        }else{
            editBranchById(dataForm)
        }
    }

    const getBase64FromImageUrl = async (url) => {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        const base64String = data.contents;
        return base64String;
      };

  return (
    <Dialog
        open={!!formAction}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: onSubmitForm,
        }}
      >
        <DialogTitle >{formAction === 'edit' ? 'Editar' : 'Crear'} Sucursal</DialogTitle>
        <Divider variant="middle"/>
        <DialogContent>
            <Grid2  sx={{mt:2}}>
                <TextField
                label="Nombre"
                type="text"
                fullWidth
                placeholder="Nombre"
                name="nombre"
                size='small'
                value={formState.nombre}
                onChange={onInputChange }
                error={!!nombreValid && formSubmitted}
                helperText={formSubmitted && nombreValid}
                />
            </Grid2>

            <Grid2  sx={{mt:2}}>
                <TextField
                label="Descripción"
                type="text"
                fullWidth
                placeholder="Descripción"
                name="descripcion"
                multiline
                rows={4}
                size='small'
                value={formState.descripcion}
                onChange={onInputChange }
                error={!!descripcionValid && formSubmitted}
                helperText={formSubmitted && descripcionValid}
                />
            </Grid2>

            <Grid2  sx={{mt:2}}>
                <TextField
                label="Teléfono"
                type="number"
                fullWidth
                placeholder="Teléfono"
                name="telefono"
                size='small'
                InputProps={{
                    inputProps: { min: 0 },
                    style: {
                      // Ocultar los controles de número
                      MozAppearance: 'textfield',
                    },
                    // Ocultar los controles de número en Chrome, Safari, Edge, Opera
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                  sx={{
                    '& input[type=number]': {
                      '-moz-appearance': 'textfield',
                    },
                    '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                      '-webkit-appearance': 'none',
                      margin: 0,
                    },
                  }}
                value={formState.telefono}
                onChange={onInputChange }
                error={!!telefonoValid && formSubmitted}
                helperText={formSubmitted && telefonoValid}
                />
            </Grid2>

            <Grid2  sx={{mt:2}}>
                <TextField
                label="Direción"
                type="text"
                fullWidth
                placeholder="Direción"
                name="direccion"
                size='small'
                value={formState.direccion}
                onChange={onInputChange }
                error={!!direccionValid && formSubmitted}
                helperText={formSubmitted && direccionValid}
                />
            </Grid2>

            <Grid2  sx={{mt:2}}>
                <TextField
                label="Imagen"
                type="file"
                fullWidth
                placeholder="Imagen"
                name="imagen"
                size='small'
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    accept: 'image/*', 
                }}
                // value={formState.imagen}
                onChange={(event)=>{
                    setImagePreview(null);
                    setFormData({...formData, imagen:''})
                    onInputChange(event);
                }}
                error={!!imagenValid && formSubmitted}
                helperText={formSubmitted && imagenValid}
                />
                {(imagePreview) && (
                    <Box sx={{width:'100%'}} display={'flex'} justifyContent={'center'}>
                        <img src={imagePreview} alt="Vista previa" style={{ marginTop: '10px', maxWidth: '300px' }} />
                    </Box>
                )}
            </Grid2>

            <Grid2  sx={{mt:2}}>
                <TextField
                label="Correo electrónico"
                type="email"
                fullWidth
                placeholder="Correo electrónico"
                name="email"
                size='small'
                value={formState.email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={formSubmitted && emailValid}
                />
            </Grid2>

            <Grid2 sx={{mt:2}}>
                <Autocomplete
                    options={paises}
                    getOptionLabel={(option) => option.name || ''}
                    loading={loadingPaises}
                    onChange={(event, value) => {
                        setPaisSeleccionado(value);
                        setEstadoSeleccionado(null);
                        setCiudadSeleccionado(null);
                        setEstados([]); 
                        setCiudades([]);
                    }}
                    value={paisSeleccionado || null}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        name='pais_id'
                        // value={formState.pais_id}
                        error={!paisSeleccionado && formSubmitted}
                        helperText={(formSubmitted && !paisSeleccionado) ? 'Campo país requerido' : ''}
                        label="País"
                        variant="outlined"
                        InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                            {loadingPaises ? <CircularProgress size={20} /> : null}
                            {params.InputProps.endAdornment}
                            </>
                        ),
                        }}
                    />
                    )}
                />
            </Grid2>

            <Grid2 sx={{mt:2}}>
                <Autocomplete
                    options={estados}
                    getOptionLabel={(option) => option.name || ''}
                    loading={loadingEstados}
                    onChange={(event, value) => {
                        setEstadoSeleccionado(value);
                        setCiudadSeleccionado(null);
                        setCiudades([]);
                    }}
                    disabled={!paisSeleccionado}
                    value={estadoSeleccionado || null}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        name='estado_id'
                        // value={formState.estado_id}
                        error={!estadoSeleccionado && formSubmitted}
                        helperText={(!estadoSeleccionado && formSubmitted) ? 'Campo estado requerido' : ''}
                        label="Departamento"
                        variant="outlined"
                        InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                            {loadingEstados ? <CircularProgress size={20} /> : null}
                            {params.InputProps.endAdornment}
                            </>
                        ),
                        }}
                    />
                    )}
                />
            </Grid2>
            
            <Grid2 sx={{mt:2}}>
                <Autocomplete
                    options={ciudades}
                    getOptionLabel={(option) => option.name || ''}
                    loading={loadingCiudades}
                    onChange={(event, value)=>{
                        setCiudadSeleccionado(value);
                    }}
                    disabled={!estadoSeleccionado}
                    value={ciudadSeleccionado || null}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        name='ciudad_id'
                        error={!ciudadSeleccionado && formSubmitted}
                        helperText={(!ciudadSeleccionado && formSubmitted) ? 'Campo ciudad requerido' : ''}
                        label="Ciudad"
                        variant="outlined"
                        InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                            {loadingCiudades ? <CircularProgress size={20} /> : null}
                            {params.InputProps.endAdornment}
                            </>
                        ),
                        }}
                    />
                    )}
                />
            </Grid2>
      
        </DialogContent>
        <DialogActions>
            <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
            <Button variant='contained' color='custom' type="submit">
                {formAction === 'edit' ? 'Editar' : 'Crear'}
            </Button>
        </DialogActions>
      </Dialog>
  )
}
