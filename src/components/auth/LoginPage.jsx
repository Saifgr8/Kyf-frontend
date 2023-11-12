import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import FacebookIcon from "../../images/Facebooklogo.webp";
import LinkedInIcon from "../../images/LinLogo.png";
import GoogleIcon from "../../images/GleLogo.png";
import BGimg from "../../images/LoginBG.jpeg";
import { setCurrentUser } from "../../utils/CurrentUserDetails";

import "./LoginPage.css";
import { signup, signin } from "../../api-services/UrlService";
import Lottie from "lottie-react";
import SigninGif from "../../Videos/SigninGIF.json";
import tomato from "../../Videos/VegTomato.json";

const LoginPage = () => {
  const [signUpData, setSignUpData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [signUpErrors, setSignUpErrors] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [signInData, setSignInData] = React.useState({
    usernameOrEmail: "",
    password: "",
  });

  const [signInErrors, setSignInErrors] = React.useState({
    usernameOrEmail: "",
    password: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [apiError, setApiError] = React.useState("");

  const resetStates = () => {
    setSignUpData({
      username: "",
      email: "",
      password: "",
    });
    setSignUpErrors({
      username: "",
      email: "",
      password: "",
    });
    setSignInData({
      usernameOrEmail: "",
      password: "",
    });
    setSignInErrors({
      usernameOrEmail: "",
      password: "",
    });
    setShowPassword(false);
    setApiError("");
  };

  const handleSignUpChange = (name, value) => {
    setApiError("");
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
    validateSignUpInput(name, value);
  };

  const handleSignInChange = (name, value) => {
    setApiError("");
    setSignInData({
      ...signInData,
      [name]: value,
    });
    validateSignInInput(name, value);
  };

  const validateSignInInput = (name, value) => {
    const errors = { ...signInErrors };

    if (name === "usernameOrEmail") {
      if (!value) {
        errors.usernameOrEmail = "Username or Email is required";
      } else if (value.length < 5) {
        errors.usernameOrEmail =
          "Username or Email must be at least 5 characters";
      } else if (value.length > 20) {
        errors.usernameOrEmail =
          "Username or Email must be less than 20 characters";
      } else {
        errors.usernameOrEmail = "";
      }
    }

    if (name === "password") {
      if (!value) {
        errors.password = "Password is required";
      } else if (value.length < 5) {
        errors.password = "Password must be at least 5 characters";
      } else if (value.length > 20) {
        errors.password = "Password must be less than 20 characters";
      } else {
        errors.password = "";
      }
    }

    setSignInErrors(errors);
  };

  const validateSignUpInput = (name, value) => {
    setApiError("");
    const errors = { ...signUpErrors };

    if (name === "username") {
      if (!value) {
        errors.username = "Username is required";
      } else if (value.length < 3) {
        errors.username = "Username must be at least 3 characters";
      } else if (value.length > 100) {
        errors.username = "Username must be less than 100 characters";
      } else {
        errors.username = "";
      }
    }

    if (name === "email") {
      if (!value) {
        errors.email = "Email is required";
      } else if (!isValidEmail(value)) {
        errors.email = "Invalid email format";
      } else {
        errors.email = "";
      }
    }

    if (name === "password") {
      if (!value) {
        errors.password = "Password is required";
      } else if (value.length < 6) {
        errors.password = "Password must be at least 6 characters";
      } else if (value.length > 40) {
        errors.password = "Password must be less than 40 characters";
      } else {
        errors.password = "";
      }
    }
    
    const confirmPasswordValue = signUpData.password;
    console.log("confirmPasswordValue");
    console.log(confirmPasswordValue);
    if(confirmPasswordValue !== value){
      errors.confirmpassword = "Passwords do not match";
    }
    else {
      errors.confirmpassword = "";
    }

    // if (name === "age") {
    //   if (!value) {
    //     errors.age = "Age is required";
    //   } else if (value < 0 || value > 150) {
    //     errors.age = "Invalid age";
    //   } else {
    //     errors.age = "";
    //   }
    // }

    // if (name === "height") {
    //   if (!value) {
    //     errors.height = "Height is required";
    //   } else if (value < 0 || value > 1000) {
    //     errors.height = "Invalid height";
    //   } else {
    //     errors.height = "";
    //   }
    // }

    // if (name === "weight") {
    //   if (!value) {
    //     errors.weight = "Weight is required";
    //   } else if (value < 0 || value > 1000) {
    //     errors.weight = "Invalid weight";
    //   } else {
    //     errors.weight = "";
    //   }
    // }

    setSignUpErrors(errors);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const errors = { ...signUpErrors };
    if (!signUpData.username || !signUpData.email || !signUpData.password) {
      if (!signUpData.username) {
        errors.username = "Username is required";
      }
      if (!signUpData.email) {
        errors.email = "Email is required";
      }
      if (!signUpData.password) {
        errors.password = "Password is required";
      }
    }

    if (Object.values(errors).every((error) => !error)) {
      setSignUpErrors({});
      signup(signUpData)
        .then((response) => {
          if (response.status === 200) {
            resetStates();
            // refresh the page, so that user can login
            window.location.reload();
          }
        })
        .catch((error) => {
          setApiError(error.response.data.message);
        });
    } else {
      setSignUpErrors(errors);
    }
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();

    const errors = { ...signInErrors };
    if (!signInData.usernameOrEmail) {
      errors.usernameOrEmail = "Username or Email is required";
    }
    if (!signInData.password) {
      errors.password = "Password is required";
    }

    if (Object.values(errors).every((error) => !error)) {
      setSignInErrors({});
      signin(signInData)
        .then((response) => {
          if (response.status === 200) {
            setCurrentUser({
              username: response.data.username,
              email: response.data.email,
              id: response.data.id,
              isLoggedIn: true,
              height: response.data.height,
              weight: response.data.weight,
              age: response.data.age,
              gender: response.data.gender,
              activityLevel: response.data.activityLevel,
            });
            resetStates();
            // redirect to home page
            window.location.href = "/";
          }
        })
        .catch((error) => {
          // setCurrentUser({
          //   username: "",
          //   email: "",
          //   id: "",
          //   isLoggedIn: false,
          // });
          setApiError(error.response.data.message);
        });
    } else {
      //  setCurrentUser({
      //       username: "",
      //       email: "",
      //       id: "",
      //       isLoggedIn: false,
      //     });
      setSignInErrors(errors);
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const slideSection = () => {
    resetStates();
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  };

  const slideSectionBack = () => {
    resetStates();
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };

  return (
    <>
      <Box
        className="loginPage"
        component="div"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "300vh",
          backgroundImage: `url(${BGimg})`,
        }}
      >
        <Lottie animationData={tomato} />
        <Container component="main">
          <CssBaseline />
          <Paper
            elevation={3}
            sx={{ borderRadius: 4, width: "fit-content", marginLeft: "90px" }}
          >
            <div className="container" id="container">
              <div className="form-container sign-up-container">
                <form onSubmit={handleSignUpSubmit}>
                  <Typography variant="h4">Create Account</Typography>
                  <Box className="social-container">
                    <Link
                      href="https://www.facebook.com/login/"
                      className="social1"
                    >
                      <img
                        src={FacebookIcon}
                        alt="Noimg"
                        height={40}
                        width={40}
                      ></img>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/login"
                      className="social1"
                    >
                      <img
                        src={LinkedInIcon}
                        alt="Noimg"
                        height={40}
                        width={40}
                        className="Link"
                      ></img>
                    </Link>
                    <Link
                      href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dgo-to-account-button&ifkv=AYZoVheKAqyIB3bYvpVTkcWbk3JK2PCDCrUmcZIte-jsRAe4pxYCorEUnvgKf00F5dqlNwGBNEMXBg&service=accountsettings&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S621508736%3A1696280460534630&theme=glif"
                      className="social1"
                    >
                      <img
                        src={GoogleIcon}
                        alt="Noimg"
                        height={40}
                        width={40}
                        className="Google"
                      ></img>
                    </Link>
                  </Box>
                  <Typography variant="subtitle1">
                    or use your email for registration
                  </Typography>
                  <TextField
                    type="text"
                    label="Username"
                    fullWidth
                    variant="outlined"
                    value={signUpData.username}
                    onChange={(e) =>
                      handleSignUpChange("username", e.target.value)
                    }
                    error={!!signUpErrors.username}
                    helperText={signUpErrors.username}
                  />
                  <TextField
                    type="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    value={signUpData.email}
                    onChange={(e) =>
                      handleSignUpChange("email", e.target.value)
                    }
                    error={!!signUpErrors.email}
                    helperText={signUpErrors.email}
                  />
                  <TextField
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    fullWidth
                    variant="outlined"
                    value={signUpData.password}
                    onChange={(e) =>
                      handleSignUpChange("password", e.target.value)
                    }
                    error={!!signUpErrors.password}
                    helperText={signUpErrors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password"
                    fullWidth
                    variant="outlined"
                    value={signUpData.confirmpassword}
                    onChange={(e) =>
                      handleSignUpChange("confirmpassword", e.target.value)
                    }
                    error={!!signUpErrors.confirmpassword}
                    helperText={signUpErrors.confirmpassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  ></Box>
                  {apiError && (
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "red",
                        marginTop: "10px",
                        fontSize: "1.3rem",
                      }}
                    >
                      {apiError}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 30px",
                      letterSpacing: "1px",
                      transition: "transform 80ms ease-in",
                      marginTop: "auto",
                    }}
                  >
                    Sign Up
                  </Button>
                </form>
              </div>
              <div className="form-container sign-in-container">
                <form onSubmit={handleSignInSubmit}>
                  <Typography variant="h4">Sign in</Typography>
                  <Lottie
                    animationData={SigninGif}
                    style={{ height: "150px" }}
                  />
                  <Box className="social-container">
                    <Link
                      href="https://www.facebook.com/login/"
                      className="social1"
                    >
                      <img
                        src={FacebookIcon}
                        alt="Noimg"
                        height={40}
                        width={40}
                      ></img>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/login"
                      className="social1"
                    >
                      <img
                        src={LinkedInIcon}
                        alt="Noimg"
                        height={40}
                        width={40}
                        className="Link"
                      ></img>
                    </Link>
                    <Link
                      href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dgo-to-account-button&ifkv=AYZoVheKAqyIB3bYvpVTkcWbk3JK2PCDCrUmcZIte-jsRAe4pxYCorEUnvgKf00F5dqlNwGBNEMXBg&service=accountsettings&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S621508736%3A1696280460534630&theme=glif"
                      className="social1"
                    >
                      <img
                        src={GoogleIcon}
                        alt="Noimg"
                        height={40}
                        width={40}
                        className="Google"
                      ></img>
                    </Link>
                  </Box>
                  <Typography variant="subtitle1">
                    or use your account
                  </Typography>
                  <TextField
                    type="text"
                    label="Username or Email"
                    fullWidth
                    variant="outlined"
                    value={signInData.usernameOrEmail}
                    onChange={(e) =>
                      handleSignInChange("usernameOrEmail", e.target.value)
                    }
                    error={!!signInErrors.usernameOrEmail}
                    helperText={signInErrors.usernameOrEmail}
                  />
                  <TextField
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    fullWidth
                    variant="outlined"
                    value={signInData.password}
                    onChange={(e) =>
                      handleSignInChange("password", e.target.value)
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!signInErrors.password}
                    helperText={signInErrors.password}
                  />
                  <Link href="/forgotpassword">Forgot your password?</Link>
                  {apiError && (
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "red",
                        marginTop: "10px",
                        fontSize: "1.3rem",
                      }}
                    >
                      {apiError}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 30px",
                      letterSpacing: "1px",
                      transition: "transform 80ms ease-in",
                      marginTop: "auto",
                    }}
                  >
                    Sign In
                  </Button>
                </form>
              </div>

              <div className="overlay-container">
                <div className="overlay">
                  <div className="overlay-panel overlay-left">
                    <Typography variant="h4">Welcome Back!</Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 100,
                        lineHeight: "20px",
                        letterSpacing: "0.5px",
                        margin: "20px 0 30px",
                      }}
                    >
                      To keep connected with us please login with your personal
                      info
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={slideSectionBack}
                      sx={{
                        color: "white",
                        borderColor: "white",
                        textTransform: "uppercase",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 30px",
                        letterSpacing: "1px",
                        transition: "transform 80ms ease-in",
                      }}
                      size="large"
                    >
                      Sign In
                    </Button>
                  </div>
                  <div className="overlay-panel overlay-right">
                    <Typography variant="h4">Hello, Friend!</Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 100,
                        lineHeight: "20px",
                        letterSpacing: "0.5px",
                        margin: "20px 0 30px",
                      }}
                    >
                      {" "}
                      Enter your personal details and start the journey with us
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "white",
                        borderColor: "white",
                        textTransform: "uppercase",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 30px",
                        letterSpacing: "1px",
                        transition: "transform 80ms ease-in",
                      }}
                      size="large"
                      onClick={slideSection}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
