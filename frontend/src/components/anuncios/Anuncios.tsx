
import * as React from 'react';

import Box from '@mui/material/Box';

import { useQuery } from 'react-query';
import axios from 'axios';
import { baseURL } from '../../config';
import { Anuncio } from '../../models/Anuncio';
import AnuncioCard from '../cards/AnuncioCard';
import {User } from '../../models/User';

const Anuncios = ({ idClase, user } : { idClase: string, user: User | null }) => {

  const fetchAnuncios = async () => {
    const res = await axios.get<Anuncio[]>(`${baseURL}api/v1/anuncio/`, { params: { clase: idClase }});
    return res.data;
  }

  const { data } = useQuery('anuncios', fetchAnuncios);

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', m: 3 }}>
      {
        data?.map(anuncio => (
          <AnuncioCard anuncio={anuncio} key={anuncio.id} idClase={idClase} user={user}/>
        ))
      }
    </Box>
  )
}

export default Anuncios;