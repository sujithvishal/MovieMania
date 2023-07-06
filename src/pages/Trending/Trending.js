import React from 'react';
import {useState,useEffect } from 'react'
import axios from 'axios';
import {apiKey} from '../../Setup/Setup'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import SingleContent from '../../components/SingleContent/SingleContent'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const Trending=()=>{

  const [trendings,setTrendings]=useState([]);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(true);

  const fetchTrending =async()=>{
    setLoading(true);
    const {data}= await axios.get( `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${page}`);
   setTrendings(data.results)
   setLoading(false);
  }
  useEffect(()=>{
    window.scroll(0, 0);
    fetchTrending();
   

  },[page])
  return (
    <>
    {loading ?<LoadingSpinner />:
    <div>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
    sx={{display:'flex',justifyContent:'center',alignItems:'center',
      textAlign:'center'}}>
    {trendings&& trendings.map(c => (
      <Grid item xs={12} sm={3} md={4} key={c.id} >
        <SingleContent  
        id={c.id}
        poster={c.poster_path}
        title={c.title || c.name}
        date={c.first_air_date || c.release_date}
        media_type={c.media_type}
        vote_average={c.vote_average}
        
        />
      </Grid>
    ))}
  </Grid>
  <CustomPagination setPage={setPage}/>


    </div>
    
    }
    </>
   
  )

}

export default Trending;