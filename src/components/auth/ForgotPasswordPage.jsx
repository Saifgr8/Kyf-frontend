import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import BGimg from "../../images/LoginBG.jpeg";

import "./LoginPage.css";
import { forgotPassword } from "../../api-services/UrlService";

const ForgotPasswordPage = () => {
  const [userEmail, setUserEmail] = React.useState("");
  const [userEmailError, setUserEmailError] = React.useState("");
  const [apiError, setApiError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const resetStates = () => {
    setUserEmail("");
    setUserEmailError("");
    setApiError("");
  };

  const handleForgotPasswordChange = (value) => {
    const email = value;
    if (!email) {
      setUserEmailError("Email is required");
    } else if (!isValidEmail(email)) {
      setUserEmailError("Invalid email");
    } else {
      setUserEmailError("");
    }
    setUserEmail(value);
    setApiError("");
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();

    if (!userEmail) {
      setUserEmailError("Email is required");
    } else if (!isValidEmail(userEmail)) {
      setUserEmailError("Invalid email");
    } else {
      setUserEmailError("");
      // call api
      forgotPassword(userEmail).then((response) => {
        if (response.status === 200) {
          resetStates();
          setSuccessMessage(
            "An email has been sent to you with instructions on how to reset your password."
          );
        } else {
          setApiError("Something went wrong. Please try again.");
        }
      }).catch((error) => {
        setApiError(error.response.data.message);
      });

    }
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Box
      className="forgotPasswordPage"
      component="div"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${BGimg})`,
        animation: "fallingAnimation 4s infinite linear",
      }}
    >
      <Container component="main" width={"70%"}>
        <CssBaseline />
        <Paper elevation={3} sx={{ borderRadius: 4, width: "fit-content" }}>
          <div className="container-forgot-password" id="container">
            <div className="form-container sign-in-container">
              <form onSubmit={handleForgotPasswordSubmit}>
                <Typography variant="h4">Forgot Password</Typography>
                <Typography variant="subtitle1">
                  Please enter your email address and we will send you a link to
                  reset your password.
                </Typography>
                <TextField
                  type="text"
                  label="Email"
                  fullWidth
                  variant="outlined"
                  value={userEmail}
                  onChange={(e) => handleForgotPasswordChange(e.target.value)}
                  error={!!userEmailError}
                  helperText={userEmailError}
                />
                {apiError && (
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", marginTop: "10px", fontSize: "1.3rem" }}
                  >
                    {apiError}
                  </Typography>
                )}
                {successMessage && (
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "green",
                      marginTop: "10px",
                      fontSize: "1.2rem",
                    }}
                  >
                    {successMessage}
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
                  Send mail
                </Button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                  <Typography variant="h4">Forgot Your Password ?</Typography>
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
                    What a shame!{"         "}
                    Do not worry, we got your back.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
