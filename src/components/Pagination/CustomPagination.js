import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({setPage,totalPage=10}) {
  return (
    <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 10
    }}
  >
      <Pagination count={totalPage} color="primary"
      onChange={(e)=>{setPage(e.target.textContent)
      window.scroll(0,0)}}
      hideNextButton
      hidePrevButton 
      sx={{padding:'10px',backgroundColor:'white'}}
  
      />  
      </div>   
  );
}