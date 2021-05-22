import React from 'react'
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import background from "../../img/bg-img.png";

const useStyles = makeStyles(() => ({
  root: {
    backgroundImage:`url(${background})`,
    backgroundSize:'cover',
    height: '100vh'
  }
}));

export default function AccessSide() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      
    </Box>
  )
}
