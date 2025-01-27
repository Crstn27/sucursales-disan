import { CircularProgress, Modal } from "@mui/material"
import { useSelector } from "react-redux";

export const Progress = () => {

  const {isProgressOpen} = useSelector((state) => state.ui);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    outline: 'none',
  };

  return (
    <Modal 
      open={isProgressOpen}
      sx={{zIndex:'9999'}}
      >
        <CircularProgress color='custom' sx={style}/>
    </Modal>
  )
}