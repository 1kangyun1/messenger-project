import React from 'react'
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const preset = {
  register: {
    text: "Don't have an account?", 
    route:'/register', 
    button: 'Register'
  },
  login: {
    text: "Need to log in?", 
    route:'/login', 
    button: 'Login'
  }
}

const useStyles = makeStyles(() => ({
  routePadding: {
    padding: '30px'
  },
  text: {
    fontSize: '0.8rem',
    color: 'grey'
  }
}));

export default function AccessChange(props) {
  const classes = useStyles();
  const history = useHistory();
  
  const route = preset[props.route];

  return (
    <Box width="80%">
      <Grid container item spacing={2} className={classes.routePadding} justify="flex-end" alignItems="baseline">
        <Grid item>
          <Typography className={classes.text}>{route.text}</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={() => history.push(route.route)}>{route.button}</Button>
        </Grid>
      </Grid>
    </Box>
  )
}
