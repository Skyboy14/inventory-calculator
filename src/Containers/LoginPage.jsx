import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import logo from "../Assets/Images/1-1.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./StyleSheet/LoginPage.css"
// import Calculator from "./Calculator";
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "styled-components";
import { AnimationPhoto } from "../Components/Carousel";
import Cal from "./CalulatorScreen";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    `
const ImageStyled = styled.div`
    height: 100%;
    width: 100%;`


function LoginPage() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(false)
  const [heightCust, setHeightCust] = useState(window.innerHeight)

  useEffect(() => {
    setHeightCust(window.innerHeight)
    console.log('akash', window.innerHeight)
  }, [])

  // User Login info
  const database = [
    {
      username: "1",
      useremail: "1",
      password: "1"
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var { uname,
      pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);


    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        setErrorMessages({ name: "pass", message: errors.pass });
        setError(true)
      }
      else {
        setIsSubmitted(true)
        setError(false)
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
      setError(true)
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginPage = (
    <div className="login-form">
      <div className="logostyled">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{
            'height': '153px',
            'marginTop': '-52px'
          }}
        />
      </div>
      <div className="title"></div>
      <div className="form">
        <form >
          <div className="inputfield">
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Username *</InputLabel>
              <Input
                id="standard-adornment-password"
                error={error}
                helperText="Incorrect Username."
                required
                name="uname"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      disabled
                      aria-label="toggle password visibility"
                      // onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      <AccountCircleIcon color='action' />
                    </IconButton>
                  </InputAdornment>
                }
              />{renderErrorMessage("uname")}
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password *</InputLabel>
              <Input
                id="standard-adornment-password"
                name="pass"
                error={error}
                required
                helperText="Incorrect Password."
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />{renderErrorMessage("pass")}
            </FormControl>
          </div>
          <Stack spacing={2} direction="row" className="buttonplcstyled">
            <Button variant="contained" type="submit" onClick={handleSubmit} className="buttonstyled">Login</Button>
          </Stack>
          <div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
      <div className="PowerdByStyle">
        @ Build by Akash Yadav.
      </div>
    </div>

  )

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 830 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 830 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  return (
    <> {isSubmitted ? (<Cal />) : (


      <div>
        <Desktop>
          <Container>
            <ImageStyled>
              <AnimationPhoto />
            </ImageStyled>
            <div className="loginPage">
              {loginPage}
            </div>
          </Container>
        </Desktop>

        <Tablet><Container><div className="fullscreenTab" ><div className="loginTab" >
          {loginPage}
        </div></div></Container></Tablet>
        <Mobile><Container><div className="fullscreenMob"><div className="loginMobile" >
          {loginPage}
        </div></div></Container></Mobile>
      </div>

    )}
    </>
  );
}

export default LoginPage;