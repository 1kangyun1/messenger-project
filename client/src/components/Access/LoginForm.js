import React from 'react'
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";

export default function LoginForm(handleLogin) {
  return (
    <Box width="60%">
      <Grid>
        <Typography>Welcome back!</Typography>
      </Grid>
      <form onSubmit={handleLogin}>
        <Grid>
          <Grid>
            <FormControl margin="normal" required>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
              />
            </FormControl>
          </Grid>
          <FormControl margin="normal" required>
            <TextField
              label="password"
              aria-label="password"
              type="password"
              name="password"
            />
          </FormControl>
          <Grid>
            <Button type="submit" variant="contained" size="large">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
