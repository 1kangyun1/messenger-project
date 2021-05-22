import React from 'react'
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import background from "../../img/bg-img.png";

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage:`url(${background})`,
    backgroundSize:'cover',
    height: '95vh'
  }
}));

export default function WelcomeImage() {
  const classes = useStyles();

  return (
    <Box display={{ xs: 'none', sm: 'block' }} className={classes.root}>
      
    </Box>
  )
}
