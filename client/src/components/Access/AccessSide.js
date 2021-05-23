import React from 'react'
import { 
  Grid, 
  Box,
  Typography 
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import background from "../../img/bg-img.png";
import bubbleIcon from '../../img/bubble.svg';

const useStyles = makeStyles(() => ({
  image: {
    backgroundImage:`linear-gradient(#3A8DFF85 10%, #86B9FF 90%), url(${background})`,
    backgroundSize:'cover',
    height: '100vh'
  },
  text: {
    fontSize: '1.5rem',
    color: 'white'
  }
}));

export default function AccessSide() {
  const classes = useStyles();

  return (
    <Box display={{ xs: 'none', sm: 'block' }}>
      <Grid container spacing={2} className={classes.image} direction="column" justify="center" alignItems="center">
        <Grid item>
          <img src={bubbleIcon} alt="React Logo" />
        </Grid>
        <Grid container item justify="center">
          <Typography className={classes.text}>Converse with anyone</Typography>
          <Typography className={classes.text}>with any language</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
