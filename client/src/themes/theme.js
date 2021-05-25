import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "regular"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "regular"
      }
    }
  },
  loginNavigation: {
    navigationBar: {
      paddingTop: '25px',
      paddingBottom: '10px'
    },
    text: {
      fontSize: '0.8rem'
    }
  },
  loginSidebar: {
    text: {
      fontSize: '1.5rem',
      color: 'white'
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" },
    gradient: { main: "#86B9FF" }
  }
});
