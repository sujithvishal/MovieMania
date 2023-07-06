import React from 'react'
import {
  Button,
  createMuiTheme,
  Tab,
  Stack,
  Tabs,
  Grid,
  TextField,
  ThemeProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import {apiKey} from '../../Setup/Setup'

const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          apiKey
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setTotalPage(data.total_pages);
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  
  }, [type, page]);

  return (
    <div>
        <div className="search">   
        <Stack direction='row' className='searchField'>  
          <input id="standard-basic" placeholder="Search"   className='input-res'
          onChange={(e) => setSearchText(e.target.value)}/>
         <Button  onClick={fetchSearch} variant="contained" color='primary' endIcon={<SearchIcon />}>
        Search
         </Button>
          </Stack>
        </div>
        <Tabs
          value={type}
          centered
          indicatorColor="secondary"
          textColor="primary"
          onChange={(event, newValue) => {
            setPage(1);
            setType(newValue);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
          sx={{marginTop:'20px'}}
        >
          <Tab style={{ width: "50%" }} label={<span style={{ color: 'white' }}>Search Movies</span>} />
      <Tab style={{ width: "50%" }} label={<span style={{ color: 'white' }}>Search series</span>} />
          </Tabs>
      
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
  sx={{display:'flex',justifyContent:'center',alignItems:'center',
    textAlign:'center'}}>
  {content&& content.map(c => (
    <Grid item xs={12} sm={3} md={4} key={c.id} >
      <SingleContent  
      id={c.id}
      poster={c.poster_path}
      title={c.title || c.name}
      date={c.first_air_date || c.release_date}
      media_type={type ? "tv" : "movie"}
      vote_average={c.vote_average}
      
      />
    </Grid>
  ))}
</Grid>
    <div className='center'>
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
          </div>
      
      {totalPage > 1&& (
        <CustomPagination setPage={setPage} totalPage={totalPage} page={page}/>
      )}
    </div>
  );
};

export default Search;









