import React,{useState,useEffect} from 'react';

import axios from 'axios';
import {apiKey} from '../../Setup/Setup'
import SingleContent from '../../components/SingleContent/SingleContent'
import Grid from '@mui/material/Grid'
import CustomPagination from '../../components/Pagination/CustomPagination'
import Genres from '../../components/Genres/Genres'
import useGenre from '../../hooks/useGenre'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'



const Movies=()=>{

  const [movies,setMovies]=useState([]);
  const [loading,setLoading]=useState(true);
  const [page,setPage]=useState(1);
  const [totalPage,setTotalPage]=useState();
  const [genres,setGenres]=useState([]);
  const [selectedGenres,setSelectedGenres]=useState([]);
  const genreforURL=useGenre(selectedGenres);

  const fetchMovies=async()=>{
    setLoading(true);
    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
   setMovies(data.results)
   setTotalPage(data.total_pages)
   setLoading(false);
  }

  useEffect(()=>{
    window.scroll(0, 0);
    fetchMovies();

  },[page,genreforURL])

  return (
    <>
    {loading ? <LoadingSpinner />:
       <div className='movies'>
       <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
  sx={{display:'flex',justifyContent:'center',alignItems:'center',
    textAlign:'center'}}>
  {movies&& movies.map(c => (
    <Grid item xs={12} sm={3} md={4} key={c.id} >
      <SingleContent  
      id={c.id}
      poster={c.poster_path}
      title={c.title || c.name}
      date={c.first_air_date || c.release_date}
      media_type={'movie'}
      vote_average={c.vote_average}
      
      />
    </Grid>
  ))}
</Grid>
<CustomPagination setPage={setPage} totalPage={totalPage}/>
    </div> }

    </>
  
  )

}

export default Movies;