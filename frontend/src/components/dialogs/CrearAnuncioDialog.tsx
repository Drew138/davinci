import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../../config';
import {Anuncio} from '../../models/Anuncio';

const CrearAnuncioDialog = ({ anuncio, idClase }: { anuncio?: Anuncio, idClase: string }) => {
  const [open, setOpen] = React.useState(false);
  const [titulo, setTitulo] = React.useState(anuncio?.titulo ?? '');
  const [cuerpo, setCuerpo] = React.useState(anuncio?.cuerpo ?? '');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const body = {
      titulo,
      cuerpo,
      clase: idClase
    }
    if (anuncio) {
      await axios.put<Anuncio>(`${baseURL}api/v1/anuncio/${anuncio?.id}/`, body);
    } else {
      await axios.post<Anuncio>(`${baseURL}api/v1/anuncio/`, body);
    }
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent:'right'}}>
      <Button variant="outlined" onClick={handleClickOpen} sx={{marginRight:"50px", marginTop: "20px"}}>
        { anuncio ? "Editar" : "Crear" } Anuncio
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{anuncio ? "Editar Anuncio" : "Crear Anuncio"}</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Titulo"
            type="text"
            fullWidth
            variant="standard"
            value={titulo} 
			      onChange={(e) => setTitulo(e.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Descripcion"
            type="text"
            fullWidth
            multiline
            variant="outlined"
            rows={10}
            value={cuerpo} 
			      onChange={(e) => setCuerpo(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CrearAnuncioDialog;