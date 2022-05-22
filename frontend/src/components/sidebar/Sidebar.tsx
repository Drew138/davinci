import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import { useQuery } from 'react-query';
import axios from 'axios';
import { baseURL } from '../../config';
import Tooltip from '@mui/material/Tooltip';
import { Clase } from '../../models/Clase';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {User} from '../../models/User';

const Sidebar = ({user}: {user: User | null}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchClases = async () => {
    const res = await axios.get<Clase[]>(`${baseURL}api/v1/clase/`, { params: {user: (user?.id || 0) } });
    return res.data;
  } 
  
  const {data} = useQuery('clases', fetchClases);

  const [nombre, setNombre] = React.useState('');
  const [codigo, setCodigo] = React.useState('');

  const handleSubmitProf = async () => {
    const body = {
      nombre
    }
    const res = await axios.post<Clase>(`${baseURL}api/v1/clase/`, body);
    await axios.post(`${baseURL}api/v1/clase/unirse_clase/`, { clase: res.data.id, usuario: user?.id });
    console.log("CLASE NUEVA:" + res.data.id);
    setOpen(false);
  };

  const handleSubmitEst = async () => {
    try {
      console.log(codigo)
      console.log(user?.id)
      const res = await axios.post(`${baseURL}api/v1/clase/unirse_clase/`, { clase: codigo, usuario: user?.id });
      const clase = res.data;
    } catch(err) {
      console.log("Clase inexistente!");
    } finally {
      setOpen(false);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 100,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 100, height: '100%', boxSizing: 'border-box', position: 'relative' },
      }}
    >
      <Box sx={{ overflow: 'auto', display: "flex", justifyContent: "center", alignItems:"center" }}>
        <List>
          {data?.map(clase => (
            <ListItem button key={clase.id}>
                <Tooltip title={clase.nombre} children={
                  <Link to={`clase/${clase.id}/anuncios`} style={{textDecoration: 'none'}} >
                    <Avatar>
                      {clase.nombre[0]}
                    </Avatar> 
                  </Link>
                }/>
            </ListItem>
          ))}
          <ListItem >
            <Avatar onClick={handleClickOpen}>
              +
            </Avatar> 
          </ListItem>
        </List>
        {user?.rol === "Profesor" && <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Crear Clase"}</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Titulo"
            type="text"
            fullWidth
            variant="standard"
            value={nombre} 
			      onChange={(e) => setNombre(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmitProf}>Guardar</Button>
        </DialogActions>
      </Dialog>}
      {user?.rol === "Estudiante" && <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Unirse a Clase"}</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="codigoClase"
            label="Codigo de la clase"
            type="text"
            fullWidth
            variant="standard"
            value={codigo} 
			      onChange={(e) => setCodigo(e.target.value)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmitEst}>Guardar</Button>
        </DialogActions>
      </Dialog>}
      </Box>
    </Drawer>
  )
}

export default Sidebar;