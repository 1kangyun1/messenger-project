import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { 
  AccessSide, 
  AccessChange,
  LoginForm,
} from "./components/Access";

const Login = (props) => {
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="space-between">
      <Grid sm="5" item>
        {AccessSide()}
      </Grid>
      <Grid sm="7" container item spacing={5} >
        <Grid container item direction="column" justify="center" alignItems="center">
          {AccessChange({route: 'register'})}
        </Grid>
        <Grid container item justify="center">
          {LoginForm({handleLogin})}
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
