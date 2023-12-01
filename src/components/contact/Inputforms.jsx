import React, { useState } from "react";
import { getCurrentUser } from "../../utils/CurrentUserDetails";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  LinearProgress,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";
import Textarea from "@mui/joy/Textarea";

function Inputforms() {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    SignInPageRating: "",
    HomePageRating: "",
    AboutPageRating: "",
    FooterRating: "",
    ExplorePageRating: "",
    RecipePageRating: "",
  });

  const [dataError, setDataError] = useState({
    SignInPageRating: "",
    HomePageRating: "",
    AboutPageRating: "",
    FooterRating: "",
    ExplorePageRating: "",
    RecipePageRating: "",
  });

  const [step, setStep] = useState(1);
  const [maxStep] = useState(6);

  const handleDataChange = (key, value) => {
    setData({ ...data, [key]: value });
    setDataError({ ...dataError, [key]: "" });
  };

  const handleNextStep = () => {
    if (step < maxStep) {
      if (step === 1 && !data.SignInPageRating) {
        setDataError({
          ...dataError,
          SignInPageRating: "Please rate User Interface first",
        });
      } else if (step === 2 && !data.HomePageRating) {
        setDataError({
          ...dataError,
          HomePageRating: "Please rate User Experience first",
        });
      } else if (step === 3 && !data.AboutPageRating) {
        setDataError({
          ...dataError,
          AboutPageRating: "Please rate Explore Food Feature first",
        });
      } else if (step === 4 && !data.FooterRating) {
        setDataError({
          ...dataError,
          FooterRating: "Please rate Set Goal first",
        });
      } else if (step === 5 && !data.ExplorePageRating) {
        setDataError({
          ...dataError,
          ExplorePageRating: "Please rate Recipe Maker first",
        });
      } else if (step === 6 && !data.RecipePageRating) {
        setDataError({
          ...dataError,
          RecipePageRating: "Please Provide a feedback",
        });
      } else {
        setDataError({
          SignInPageRating: "",
          HomePageRating: "",
          AboutPageRating: "",
          FooterRating: "",
          ExplorePageRating: "",
          RecipePageRating: "",
        });
        setStep(step + 1);
      }
    }
  };
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/app");
    }
  };

  const renderContent = (step) => {
    switch (step) {
      case 1:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h4">
              {" "}
              Please rate our User Interface.
            </Typography>
            <TextField
              sx={{
                marginTop: "10px",
                width: "70%",
              }}
              type="number"
              label="1-5"
              placeholder="1-5"
              variant="outlined"
              size="small"
              value={data.SignInPageRating}
              onChange={(e) => {
                const inputValue = Math.min(5, Math.max(1, e.target.value));
                handleDataChange("SignInPageRating", inputValue);
              }}
              error={!!dataError.SignInPageRating}
              helperText={dataError.SignInPageRating}
              inputProps={{
                min: 1,
                max: 5,
                step: 1,
              }}
            />
          </Box>
        );
      case 2:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h4">
              {" "}
              Please rate our User Experience{" "}
            </Typography>
            <TextField
              sx={{
                marginTop: "10px",
                width: "70%",
              }}
              type="number"
              label="1-5"
              placeholder="1-5"
              variant="outlined"
              size="small"
              value={data.HomePageRating}
              onChange={(e) => {
                const inputValue = Math.min(5, Math.max(1, e.target.value));
                handleDataChange("HomePageRating", inputValue);
              }}
              error={!!dataError.HomePageRating}
              helperText={dataError.HomePageRating}
              inputProps={{
                min: 1,
                max: 5,
                step: 1,
              }}
            />
          </Box>
        );
      case 3:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h4">
              {" "}
              Please rate our Explore Food Feature{" "}
            </Typography>
            <TextField
              sx={{
                marginTop: "10px",
                width: "70%",
              }}
              type="number"
              label="1-5"
              placeholder="1-5"
              variant="outlined"
              size="small"
              value={data.AboutPageRating}
              onChange={(e) => {
                const inputValue = Math.min(5, Math.max(1, e.target.value));
                handleDataChange("AboutPageRating", inputValue);
              }}
              error={!!dataError.AboutPageRating}
              helperText={dataError.AboutPageRating}
              inputProps={{
                min: 1,
                max: 5,
                step: 1,
              }}
            />
          </Box>
        );
      case 4:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h4">
              {" "}
              Please rate our Set Goal Feature{" "}
            </Typography>
            <TextField
              sx={{
                marginTop: "10px",
                width: "70%",
              }}
              type="number"
              label="1-5"
              placeholder="1-5"
              variant="outlined"
              size="small"
              value={data.FooterRating}
              onChange={(e) => {
                const inputValue = Math.min(5, Math.max(1, e.target.value));
                handleDataChange("FooterRating", inputValue);
              }}
              error={!!dataError.FooterRating}
              helperText={dataError.FooterRating}
              inputProps={{
                min: 1,
                max: 5,
                step: 1,
              }}
            />
          </Box>
        );
      case 5:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h4">
              {" "}
              Please rate our Recipe Maker feature{" "}
            </Typography>
            <TextField
              sx={{
                marginTop: "10px",
                width: "70%",
              }}
              type="number"
              label="1-5"
              placeholder="1-5"
              variant="outlined"
              size="small"
              value={data.ExplorePageRating}
              onChange={(e) => {
                const inputValue = Math.min(5, Math.max(1, e.target.value));
                handleDataChange("ExplorePageRating", inputValue);
              }}
              error={!!dataError.ExplorePageRating}
              helperText={dataError.ExplorePageRating}
              inputProps={{
                min: 1,
                max: 5,
                step: 1,
              }}
            />
          </Box>
        );
      case 6:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Typography variant="h4"> Please leave your feedback </Typography>
            <Textarea
              placeholder="Your message will be delivered to me, please type..."
              minRows={4}
              maxRows={4}
              sx={{ width: "400px", height: "100px" }}
              onChange={(e) => {
                const inputValue = e.target.value;
                handleDataChange("RecipePageRating", inputValue);
              }}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Card
        raised
        sx={{
          width: "500px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          marginBottom: "150px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "40%",
            padding: "15px 15px 0px 15px",
          }}
        >
          <ArrowBackIcon onClick={handlePreviousStep} />
        </Box>
        <Typography>ID: {currentUser.id}</Typography>
        <Typography>Name: {currentUser.username}</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "15px 15px 0px 15px",
          }}
        >
          <Typography variant="subtitle1">
            {step}/{maxStep}
          </Typography>
          <Box mx={2} width="100%">
            <LinearProgress
              variant="determinate"
              value={(step / maxStep) * 100}
              sx={{ bgcolor: "red" }}
            />
          </Box>
        </Box>
        <CardContent
          sx={{
            paddingTop: "20px",
          }}
        >
          {renderContent(step)}
        </CardContent>

        <Box
          p={3}
          display="flex"
          gap="30px"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          marginTop="auto"
        >
          <Box
            sx={{
              width: "90%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "10px",
              backgroundColor: "#F5F5F5",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Typography variant="subtitle1">
              All of your information is confidential.
            </Typography>
          </Box>
          {step < maxStep ? (
            <Button
              variant="contained"
              sx={{ width: "350px" }}
              color="primary"
              onClick={handleNextStep}
            >
              Continue
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ width: "350px" }}
              color="primary"
              onClick={() => setOpen(true)}
            >
              Submit
            </Button>
          )}
        </Box>
      </Card>

      {open && (
        <Card
          sx={{
            width: "500px",
            height: "450px",
            position: "absolute",
            backgroundColor: "grey",
            zIndex: "1000",
          }}
          className="cardbox"
        >
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            className="boxbox"
            component="fieldset"
            mb={3}
            borderColor="transparent"
          >
            <h1> Ratings</h1>
            <div>
              <span>User Interface : </span>
              <Rating
                name="SignInPageRating"
                value={parseFloat(data.SignInPageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>User Experience : </span>
              <Rating
                name="HomePageRating"
                value={parseFloat(data.HomePageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>Explore Food Feature : </span>
              <Rating
                name="AboutPageRating"
                value={parseFloat(data.AboutPageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>Set Goal Feature: </span>
              <Rating
                name="AboutPageRating"
                value={parseFloat(data.FooterRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>Recipe Maker: </span>
              <Rating
                name="AboutPageRating"
                value={parseFloat(data.ExplorePageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>Feedback : </span>
              <Textarea
                placeholder={data.RecipePageRating}
                sx={{ height: "150px", overflowY: "scroll" }}
                minRows={4}
                maxRows={4}
              />
            </div>
            <Button
              sx={{ mt: "5px" }}
              variant="contained"
              onClick={() => {
                window.alert("Response submitted, Sit tight for updates :)");
                navigate("/app");
              }}
            >
              Submit
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
}

export default Inputforms;
