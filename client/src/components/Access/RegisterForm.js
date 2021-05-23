import React from 'react'
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  focus: {
    fontSize: '1.5rem'
  }
}));

export default function RegisterForm(props) {
  const classes = useStyles();

  return (
    <Box width="60%">
      <Grid>
        <Typography className={classes.focus}>Create an account.</Typography>
      </Grid>
      <form onSubmit={props.handleRegister}>
        <Grid container direction="column">
          <FormControl>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"
              required
            />
          </FormControl>
          <FormControl>
            <TextField
              label="E-mail address"
              aria-label="e-mail address"
              type="email"
              name="email"
              required
            />
          </FormControl>
          <FormControl error={!!props.formErrorMessage.confirmPassword}>
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="password"
              required
            />
            <FormHelperText>
              {props.formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
          <FormControl error={!!props.formErrorMessage.confirmPassword}>
            <TextField
              label="Confirm Password"
              aria-label="confirm password"
              type="password"
              inputProps={{ minLength: 6 }}
              name="confirmPassword"
              required
            />
            <FormHelperText>
              {props.formErrorMessage.confirmPassword}
            </FormHelperText>
          </FormControl>
            <Button type="submit" variant="contained" color="primary" size="large">
              Create
            </Button>
        </Grid>
      </form>
    </Box>
  )
}
