import React from 'react'
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Button,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  routePadding: theme.loginNavigation.navigationBar,
  text: {
    fontSize: theme.loginNavigation.text,
    color: theme.palette.secondary.main
  }
}));

export default function LoginNavigation(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box width="80%">
      <Grid container item spacing={2} className={classes.routePadding} justify="flex-end" alignItems="baseline">
        <Grid item>
          <Typography className={classes.text}>{props.text}</Typography>
        </Grid>
        <Grid item>
          <Paper elevation={2}>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => history.push(props.route)}
            >
              {props.button}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
