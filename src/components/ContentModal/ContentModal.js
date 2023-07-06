import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {apiKey} from '../../Setup/Setup';
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import {
  img_500,
  img_300,
  unavailable,
  unavailableLandscape,
} from "../../Setup/Setup";
import YouTubeIcon from "@mui/icons-material/YouTube";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundImage: "linear-gradient(to bottom right, rgb(32, 184, 223,1) , rgb(2, 38, 71,1))",
    border: "1px solid #282c34",
    borderRadius:'20px',
    color: "white"
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundImage: 'linear-gradient(to bottom right, rgb(32, 184, 223,0.5 ), rgb(2, 38, 71,0.7))',
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({children,id,media_type}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [content,setContent]=useState({});
  const [video,setVideo]=useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${apiKey}&language=en-US`
    );

    setContent(data);
    
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${apiKey}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
   
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, [open])

  return (
    <div>
      <div onClick={handleOpen} style={{cursor:'pointer'}}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide in={open} direction="up" mountOnEnter unmountOnExit>
        {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
              <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
              
                <div className="ContentModal__about">
                <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>
                  
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    sx={{margin:'5px'}}
                  >
                    Watch the Trailer
                  </Button>

                </div>
              </div>
            </div>
          )}
        </Slide>
      </Modal>
    </div>
  );
}
