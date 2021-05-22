import React from 'react'
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";

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

export default function AccessChange(props) {
  const history = useHistory();
  
  const route = preset[props.route];

  return (
    <Grid container item justify="flex-end">
      <Typography>{route.text}</Typography>
      <Button color="primary" onClick={() => history.push(route.route)}>{route.button}</Button>
    </Grid>
  )
}
