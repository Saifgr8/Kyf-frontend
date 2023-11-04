import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import BGimg from "../../images/LoginBG.jpeg";
import { useLocation } from "react-router-dom";

import "./LoginPage.css";
import { resetPassword } from "../../api-services/UrlService";

const ResetPasswordPage = () => {
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const [apiError, setApiError] = React.useState("");

  const resetStates = () => {
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setApiError("");
    setErrors({
      password: "",
      confirmPassword: "",
    });
  };

  const handlePasswordChange = (name, value) => {
    if (name === "password") {
      setPassword(value);
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    validatePasswordInput(name, value);
  };

  const validatePasswordInput = (name, value) => {
    const errors1 = { ...errors };

    if (name === "password") {
      if (!value) {
        errors1.password = "Password is required";
      } else if (value.length < 5) {
        errors1.password = "Password must be at least 5 characters";
      } else if (value.length > 20) {
        errors1.password = "Password must be less than 20 characters";
      } else {
        errors1.password = "";
      }
    }
    if (name === "confirmPassword") {
      if (!value) {
        errors1.confirmPassword = "Confirm Password is required";
      } else if (value.length < 5) {
        errors1.confirmPassword =
          "Confirm Password must be at least 5 characters";
      } else if (value.length > 20) {
        errors1.confirmPassword =
          "Confirm Password must be less than 20 characters";
      } else {
        errors1.confirmPassword = "";
      }
    }

    setErrors(errors1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors1 = { ...errors };
    if (!password) {
      errors1.password = "Password is required";
    }
    if (!confirmPassword) {
      errors1.confirmPassword = "Confirm Password is required";
    }
    if (password !== confirmPassword) {
      errors1.confirmPassword = "Passwords do not match";
    }

    if (errors1.password || errors1.confirmPassword) {
      setErrors(errors1);
      return;
    } else {
      // call api
      resetPassword({ password, token })
        .then((res) => {
          console.log(res);
          resetStates();
          alert("Password reset successfully");
          // redirect to login page
          window.location.href = "/login";
        })
        .catch((err) => {
          console.log(err);
          setApiError(err.message);
        });
    }
  };

  return (
    <Box
      className="loginPage"
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
          <div
            className="container"
            id="container"
            style={{
              minHeight: "500px",
            }}
          >
            <div className="form-container sign-in-container">
              <form onSubmit={handleSubmit}>
                <Typography variant="h4">Reset Password</Typography>
                <Typography variant="subtitle1">
                  Enter your new password and confirm it.
                </Typography>
                <TextField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) =>
                    handlePasswordChange("password", e.target.value)
                  }
                  error={!!errors.password}
                  helperText={errors.password}
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
                  value={confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange("confirmPassword", e.target.value)
                  }
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {apiError && (
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "red", marginTop: "10px", fontSize: "1.3rem" }}
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
                  Reset
                </Button>
              </form>
            </div>
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-right">
                  <Typography variant="h4">Reset your password!</Typography>
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
                    Do not forget your password again!
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

export default ResetPasswordPage;
