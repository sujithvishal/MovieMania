import Chip  from "@mui/material/Chip";
import axios from "axios";
import React, { useEffect } from "react";
import {apiKey} from '../../Setup/Setup'

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${apiKey}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };
  }, []);

  return (
    <div style={{ padding: "6px 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
        className='chip'
          style={{ margin: 3 ,padding:'3px'}}
          label={genre.name}
          key={genre.id}
          clickable
          color='success'
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
       {genres.length>1&&genres.map((genre) => (
        <Chip
          className='chip'
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          color='primary'
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
     
    </div>
  );
};

export default Genres;
