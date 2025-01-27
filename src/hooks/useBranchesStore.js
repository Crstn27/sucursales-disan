import { useDispatch, useSelector } from "react-redux";
import { appApi } from "../api";
import { useSnackbar } from "notistack";
import { getBranchesData, onCloseProgress, onOpenProgress } from "../store";


export const useBranchesStore = () => {
    const { branches } = useSelector((state) => state.branches);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    
    const deleteBranch = async(id) => {
        
    };

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
        
        //* Métodos
        deleteBranch,
        getAllBranches  
    };
}