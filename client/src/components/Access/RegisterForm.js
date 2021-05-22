import React from 'react'
import {
  Grid,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";

export default function RegisterForm(props) {
  return (
    <Grid>
      <Grid>
        <Typography>Create an account.</Typography>
      </Grid>
      <form onSubmit={props.handleRegister}>
        <Grid>
          <Grid>
            <FormControl>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                required
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required
              />
            </FormControl>
          </Grid>
          <Grid>
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
          </Grid>
          <Grid>
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
          </Grid>
          <Button type="submit" variant="contained" size="large">
            Create
          </Button>
        </Grid>
      </form>
    </Grid>
  )
}
