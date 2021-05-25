import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { 
  LoginSidebar, 
  LoginNavigation,
  RegisterForm,
} from "./components/Login"


const Login = (props) => {
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container justify="space-between">
      <Grid sm={5} item>
        <LoginSidebar />
      </Grid>
      <Grid sm={7} container item>
        <Grid container item direction="column" alignItems="center">
        <LoginNavigation 
          text="Need to log in?" 
          route='/login' 
          button='Login' 
        />
        </Grid>
        <Grid container item justify="center">
          <RegisterForm handleRegister={handleRegister} formErrorMessage={formErrorMessage} />
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
