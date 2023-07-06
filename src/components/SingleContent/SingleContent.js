

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import {img_300,unavailable} from '../../Setup/Setup'
import ContentModal from '../ContentModal/ContentModal'
export default function SingleContent({ id,
  poster,
  title,
  date,
  media_type,
  vote_average}) {
 

  return (
    <ContentModal id={id} media_type={media_type}>
       <Card sx={{ maxWidth: 350,minHeight:240 }} className='card'>
      <CardMedia
        component="img"
        alt={title}
        height='260px'
        image={poster ? `${img_300}${poster}` : unavailable}
      />
      <CardContent sx={{maxHeight:'100px',margin:'-5px 0px 0px 0px'}}>
        <Typography gutterBottom variant="h6" component="div" sx={{maxHeight:'30px'}}>
          {title.length<30?title:title.substring(0,30)}
        </Typography>
        <Stack direction="row" sx={{display:'flex',justifyContent:'space-around'}}>
        <Typography variant="body2"  >
          {media_type}
        </Typography>
        <Chip label={vote_average} variant="outlined" 
         color={vote_average > 6 ? "primary" : "secondary"}/>
        <Typography variant='body2'>
          {date}
        </Typography>
        </Stack>
      </CardContent>
    </Card>
    </ContentModal >
   
  );
}

