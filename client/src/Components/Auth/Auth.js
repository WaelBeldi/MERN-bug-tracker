import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import UserModel from "../../Models/UserModel";
import { signup, signin } from "../../Redux/actions/authActions";

import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Container,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "../Input";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

const Auth = ({ setUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [userObject, setUserObject] = useState(new UserModel());
  const [Signup, setSignup] = useState({
    state: false,
    header: "Login",
  });
  const [emailError, setEmailError] = useState({
    error: false,
    message: "",
  });
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  });
  const [disableSubmit, setDisableSubmit] = useState(true);

  // const switchMode = () => {
  //   setSignup({
  //     ...Signup,
  //     state: !Signup.state,
  //     header: !Signup.state ? "Sign Up" : "Login",
  //   });
  //   setDisableSubmit(true);
  //   setEmailError({
  //     ...emailError,
  //     error: false,
  //     message: "",
  //   });
  //   setPasswordError({
  //     ...emailError,
  //     error: false,
  //     message: "",
  //   });
  //   setShowPassword(false);
  // };

  const handleChange = (e) => {
    setUserObject({
      ...userObject,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "email") {
      setEmailError({
        ...emailError,
        error: false,
        message: "",
      });
    }
    if (e.target.name === "password") {
      setPasswordError({
        ...emailError,
        error: false,
        message: "",
      });
    }
  };
  useEffect(() => {
    let signupParamsBool = userObject.role !== "" && userObject.userName !== "";
    let loginParamsBool = userObject.email !== "" && userObject.password !== "";
    if (
      (Signup.state && signupParamsBool && loginParamsBool) ||
      (!Signup.state && loginParamsBool)
    ) {
      setDisableSubmit(false);
    }
  });

  // useEffect(() => {
  //   if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userObject.email)){
  //     setEmailError({
  //       ...emailError,
  //       error: true,
  //       message: "Please enter a valid email"
  //     })}
  // }, [userObject.email])

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        userObject.email
      )
    ) {
      setEmailError({
        ...emailError,
        error: true,
        message: "Please enter a valid email",
      });
    } else if (Signup.state) {
      dispatch(signup({ ...userObject }, setUser, setEmailError, setSignup));
      navigate("/");
    } else {
      dispatch(
        signin(
          { ...userObject },
          setUser,
          setEmailError,
          setPasswordError,
          setSignup
        )
      );
      navigate("/");
    }
  };

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <Box
          xs={12}
          sx={{
            margin: "100px auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ backgroundColor: "black" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            {Signup.header}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            xs={12}
          >
            <Grid container spacing={2}>
              {/* {Signup.state && (
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="userName"
                    value={userObject.userName}
                    onChange={handleChange}
                    label="User Name"
                    helperText=""
                    required
                    fullWidth
                    autoFocus
                  />
                </Grid>
              )} */}
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email Address"
                  name="email"
                  value={userObject.email}
                  onChange={handleChange}
                  autoComplete="email"
                  helperText={emailError.message}
                  error={emailError.error}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  name="password"
                  value={userObject.password}
                  label="Password"
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                  error={passwordError.error}
                  helperText={passwordError.message}
                />
              </Grid>

              {/* {Signup.state && (
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="space-between"
                >
                  <FormLabel component="legend">Role</FormLabel>
                  <RadioGroup
                    row
                    name="role"
                    value={userObject.role}
                    onChange={handleChange}
                    sx={{ flexWrap: "nowrap" }}
                  >
                    <FormControlLabel
                      value="tester"
                      control={<Radio />}
                      label="Tester"
                    />
                    <FormControlLabel
                      value="developer"
                      control={<Radio />}
                      label="Developer"
                      sx={{ ml: 5 }}
                    />
                  </RadioGroup>
                </Grid>
              )} */}
            </Grid>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={disableSubmit}
            >
              {Signup.state ? "Sign Up" : "Login"}
            </Button>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode} sx={{ color: "black" }}>
                  {Signup.state
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Auth;
