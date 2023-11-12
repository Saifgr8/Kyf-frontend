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
    DashboardPageRating: "",
    FeedbackPageRating: "",
    SetGoalPageRating: "",
  });

  const [dataError, setDataError] = useState({
    SignInPageRating: "",
    HomePageRating: "",
    AboutPageRating: "",
    FooterRating: "",
    ExplorePageRating: "",
    RecipePageRating: "",
    DashboardPageRating: "",
    FeedbackPageRating: "",
    SetGoalPageRating: "",
  });

  const [step, setStep] = useState(1);
  const [maxStep] = useState(9);

  const handleDataChange = (key, value) => {
    setData({ ...data, [key]: value });
    setDataError({ ...dataError, [key]: "" });
  };

  const handleNextStep = () => {
    if (step < maxStep) {
      if (step === 1 && !data.SignInPageRating) {
        setDataError({
          ...dataError,
          SignInPageRating: "Please rate SigninPage first",
        });
      } else if (step === 2 && !data.HomePageRating) {
        setDataError({
          ...dataError,
          HomePageRating: "Please rate HomePage first",
        });
      } else if (step === 3 && !data.AboutPageRating) {
        setDataError({
          ...dataError,
          AboutPageRating: "Please rate AboutPage first",
        });
      } else if (step === 4 && !data.FooterRating) {
        setDataError({
          ...dataError,
          FooterRating: "Please rate Footer first",
        });
      } else if (step === 5 && !data.ExplorePageRating) {
        setDataError({
          ...dataError,
          ExplorePageRating: "Please rate ExplorePage first",
        });
      } else if (step === 6 && !data.RecipePageRating) {
        setDataError({
          ...dataError,
          RecipePageRating: "Please rate RecipePage first",
        });
      } else if (step === 7 && !data.DashboardPageRating) {
        setDataError({
          ...dataError,
          DashboardPageRating: "Please rate DashboardPage first",
        });
      } else if (step === 8 && !data.FeedbackPageRating) {
        setDataError({
          ...dataError,
          FeedbackPageRating: "Please rate FeedbackPage first",
        });
      } else if (step === 9 && !data.SetGoalPageRating) {
        setDataError({
          ...dataError,
          SetGoalPageRating: "Please rate SetGoalPage first",
        });
      } else {
        setDataError({
          SignInPageRating: "",
          HomePageRating: "",
          AboutPageRating: "",
          FooterRating: "",
          ExplorePageRating: "",
          RecipePageRating: "",
          DashboardPageRating: "",
          FeedbackPageRating: "",
          SetGoalPageRating: "",
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
            <Typography variant="h4"> Please rate our Sign-in page</Typography>
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
            <Typography variant="h4"> Please rate our HomePage </Typography>
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
            <Typography variant="h4"> Please rate our AboutPage </Typography>
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
            <Typography variant="h4"> Please rate our Footer </Typography>
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
            <Typography variant="h4"> Please rate our ExplorePage </Typography>
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
            <Typography variant="h4"> Please rate our RecipePage </Typography>
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
              value={data.RecipePageRating}
              onChange={(e) => {
                const inputValue = Math.min(5, Math.max(1, e.target.value));
                handleDataChange("RecipePageRating", inputValue);
              }}
              error={!!dataError.RecipePageRating}
              helperText={dataError.RecipePageRating}
              inputProps={{
                min: 1,
                max: 5,
                step: 1,
              }}
            />
          </Box>
        );
      case 7:
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
              Please rate our DashboardPage{" "}
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
              value={data.DashboardPageRating}
              onChange={(e) => {
                const inputValue = Math.min(5, Math.max(1, e.target.value));
                handleDataChange("DashboardPageRating", inputValue);
              }}
              error={!!dataError.DashboardPageRating}
              helperText={dataError.DashboardPageRating}
              inputProps={{
                min: 1,
                max: 5,
                step: 1,
              }}
            />
          </Box>
        );
      case 8:
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
            <Typography variant="h4">Please rate our FeedbackPage </Typography>
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
              value={data.FeedbackPageRating}
              onChange={(e) => {
                const inputValue = Math.min(5, Math.max(1, e.target.value));
                handleDataChange("FeedbackPageRating", inputValue);
              }}
              error={!!dataError.FeedbackPageRating}
              helperText={dataError.FeedbackPageRating}
              inputProps={{
                min: 1,
                max: 5,
                step: 1,
              }}
            />
          </Box>
        );
      case 9:
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
            <Typography variant="h4">Please rate our SetGoalPage </Typography>
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
              value={data.SetGoalPageRating}
              onChange={(e) => {
                const inputValue = Math.min(5, Math.max(1, e.target.value));
                handleDataChange("SetGoalPageRating", inputValue);
              }}
              error={!!dataError.SetGoalPageRating}
              helperText={dataError.SetGoalPageRating}
              inputProps={{
                min: 1,
                max: 5,
                step: 1,
              }}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  console.log(data);

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
            position: 'absolute',
            backgroundColor: 'grey',
            zIndex: '1000'
        
          }}
          className="cardbox"
        >
          <Box sx={{display: 'flex', flexDirection: 'column'}} className="boxbox" component="fieldset" mb={3} borderColor="transparent">
            <h1> Ratings</h1>
            <div>
              <span>Sign In Page: </span>
              <Rating
                name="SignInPageRating"
                value={parseFloat(data.SignInPageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>Home Page: </span>
              <Rating
                name="HomePageRating"
                value={parseFloat(data.HomePageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>About page: </span>
              <Rating
                name="AboutPageRating"
                value={parseFloat(data.AboutPageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>Footer:  </span>
              <Rating
                name="AboutPageRating"
                value={parseFloat(data.FooterRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>Explore page: </span>
              <Rating
                name="AboutPageRating"
                value={parseFloat(data.ExplorePageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>Recipe page: </span>
              <Rating
                name="AboutPageRating"
                value={parseFloat(data.RecipePageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>Dashboard page: </span>
              <Rating
                name="AboutPageRating"
                value={parseFloat(data.DashboardPageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span>Feedback page: </span>
              <Rating
                name="AboutPageRating"
                value={parseFloat(data.FeedbackPageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            <div>
              <span >SetGoal page: </span>
              <Rating
                name="AboutPageRating"
                value={parseFloat(data.SetGoalPageRating)}
                precision={0.5}
                readOnly
              />
            </div>
            {/* Add similar blocks for other pages */}
          </Box>
        </Card>
      )}
    </Box>
  );
}

export default Inputforms;
