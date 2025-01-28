import { useDispatch, useSelector } from "react-redux";
import { appApi } from "../api";
import { useSnackbar } from "notistack";
import { addBranch, deleteBranchById, editBranch, getBranchesData, onCloseProgress, onOpenProgress, onToggleForm } from "../store";


export const useBranchesStore = () => {
    const { branches, selectedBranch } = useSelector((state) => state.branches);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    
    const deleteBranch = async(id) => {
        dispatch( onOpenProgress())
        try {
            const {data} = await appApi.delete(`/sucursal/3`);
            if (data.code === 200) {
                dispatch( deleteBranchById(id));
            }
            enqueueSnackbar('Sucursal eliminada exitosamente', {variant: 'success'});
            
        } catch ({response}) {
            console.error(response);
            enqueueSnackbar(`Error al eliminar la sucursal, ${response.data.message}`, {variant: 'error'});
            
        }finally {
            dispatch( onCloseProgress())
        }
    };

    const createBranch = async(dataBranch)=>{
        dispatch( onOpenProgress())
        try {
            const {data} = await appApi.post(`/sucursal`, dataBranch);
            if (data.code === 200) {
                dispatch( addBranch(dataBranch));
                dispatch(onToggleForm(null));
                enqueueSnackbar('Sucursal creada exitosamente', {variant: 'success'});
            }
            
        } catch ({response}) {
            console.error(response);
            enqueueSnackbar(`Error al crear la sucursal, ${response.data.message}`, {variant: 'error'});
            
        }finally {
            dispatch( onCloseProgress())
        }
    }

    const editBranchById = async(dataBranch)=>{
        dispatch( onOpenProgress())
        try {
            const {data} = await appApi.put(`/sucursal/${selectedBranch.id}`, dataBranch);
            if (data.code === 200) {
                dispatch( editBranch({id: selectedBranch.id, ...dataBranch}));
                dispatch(onToggleForm(null));
                enqueueSnackbar(`Sucursal "${selectedBranch.nombre}" editada exitosamente`, {variant: 'success'});
            }
            
        } catch ({response}) {
            console.error(response);
            enqueueSnackbar(`Error al editar la sucursal, ${response.data.message}`, {variant: 'error'});
            
        }finally {
            dispatch( onCloseProgress())
        }
    }



    const getAllBranches = async() => {
        dispatch( onOpenProgress())
        try {
            const {data} = await appApi.get('/sucursal/1');
            dispatch( getBranchesData(data.data));
            
        } catch ({response}) {
            console.error(response);
            enqueueSnackbar('Error al cargar los datos de las sucursales', {variant: 'error'});
            
        }finally {
            dispatch( onCloseProgress())
        }
    }

    
    return { 
        //* properties
        branches,
        selectedBranch,
        
        //* Métodos
        deleteBranch,
        getAllBranches,
        createBranch,
        editBranchById
          
    };
}