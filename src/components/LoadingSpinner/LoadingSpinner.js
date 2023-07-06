import React from 'react';
import CircularProgress from '@mui/material/CircularProgress'

const LoadingSpinner = ()=>{
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'70vh'}}>
      <CircularProgress color="secondary" />
    </div>
  )
}

export default LoadingSpinner;