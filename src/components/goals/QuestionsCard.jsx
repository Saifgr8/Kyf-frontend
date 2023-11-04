import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  LinearProgress,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Paper,
} from "@mui/material";
import Lottie from "lottie-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Female,
  Fireplace,
  Male,
  Security,
  SportsGymnasticsOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { onBoardUser } from "../../api-services/UrlService";
import {
  getCurrentUser,
  isUserOnBoarded,
  updateCurrentUser,
} from "../../utils/CurrentUserDetails";
import steps from "../../Videos/steps.json";

const QuestionsCard = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [totalSteps] = useState(6);
  const [data, setData] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activeLevel: "",
  });
  const [feet, setFeet] = useState("");

  const convertFeetToCentimeter = (feetValue) => {
    const parsedFeet = parseFloat(feetValue);
    if (!isNaN(parsedFeet)) {
      return (parsedFeet * 30.48).toFixed(2);
    } else {
      return "";
    }
  };

  const handleFeetChange = (e) => {
    const newFeet = e.target.value;
    setFeet(newFeet);
  };

  const [dataErrors, setDataErrors] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activeLevel: "",
  });

  const currentUser = getCurrentUser();
  const handleDataChange = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
    setDataErrors({
      ...dataErrors,
      [key]: "",
    });
  };

  const handleNextStep = () => {
    if (step < totalSteps) {
      if (step === 1 && !data.weight) {
        setDataErrors({
          ...dataErrors,
          weight: "Please enter your weight",
        });
      } else if (step === 2 && !data.height) {
        setDataErrors({
          ...dataErrors,
          height: "Please enter your height",
        });
      } else if (step === 3 && !data.age) {
        setDataErrors({
          ...dataErrors,
          age: "Please enter your age",
        });
      } else if (step === 4 && !data.gender) {
        setDataErrors({
          ...dataErrors,
          gender: "Please select your gender",
        });
      } else if (step === 5 && !data.activeLevel) {
        setDataErrors({
          ...dataErrors,
          activeLevel: "Please select your active level",
        });
      } else {
        setDataErrors({
          weight: "",
          height: "",
          age: "",
          gender: "",
          activeLevel: "",
        });
        setStep(step + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      isUserOnBoarded() ? navigate("/app/goals") : navigate("/app/");
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
            <Lottie className="StepsGif" animationData={steps} />
            <Typography variant="h4"> What's your latest weight?</Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: "8px",
              }}
            >
              You can update your weight at any time.
            </Typography>
            <TextField
              sx={{
                marginTop: "10px",
                width: "70%",
              }}
              type="number"
              label="Weight"
              placeholder="kg"
              variant="outlined"
              size="small"
              value={data.weight}
              onChange={(e) => handleDataChange("weight", e.target.value)}
              error={!!dataErrors.weight}
              helperText={dataErrors.weight}
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
              gap: "1rem",
              paddingTop: "6px",
            }}
          >
            <Typography variant="h4"> What's your height?</Typography>
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: "8px",
              }}
            >
              You can update your height at any time.
            </Typography>
            <TextField
              sx={{
                marginTop: "10px",
                width: "70%",
              }}
              type="number"
              label="Height"
              placeholder="cm"
              variant="outlined"
              size="small"
              value={data.height}
              onChange={(e) => handleDataChange("height", e.target.value)}
              error={!!dataErrors.height}
              helperText={dataErrors.height}
            />
            <Typography sx={{ marginTop: "5px" }}>
              Convert your feet into centimeter here
            </Typography>
            <TextField
              type="number"
              label="feet"
              placeholder="5.11"
              variant="outlined"
              size="small"
              value={feet}
              onChange={handleFeetChange}
            />

            <TextField
              type="number"
              label="cm"
              variant="outlined"
              size="small"
              value={convertFeetToCentimeter(feet)}
              readOnly // Make it read-only to prevent user input
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
              gap: "1rem",
              paddingTop: "6px",
            }}
          >
            <Typography variant="h4"> What's your age?</Typography>
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: "8px",
              }}
            >
              You can update your age at any time.
            </Typography>
            <TextField
              sx={{
                marginTop: "10px",
                width: "70%",
              }}
              type="number"
              label="Age"
              placeholder="years"
              variant="outlined"
              size="small"
              value={data.age}
              onChange={(e) => handleDataChange("age", e.target.value)}
              error={!!dataErrors.age}
              helperText={dataErrors.age}
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
              gap: "0.8rem",
              paddingTop: "4px",
            }}
          >
            <Typography variant="h4">What is your gender?</Typography>
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: "4px",
              }}
            >
              This helps us create your personalized plan.
            </Typography>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={data.gender}
              onChange={(e) => handleDataChange("gender", e.target.value)}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Paper elevation={3}>
                    <Box
                      p={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Male fontSize="large" />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={3}>
                    <Box
                      p={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Female fontSize="large" />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={3}>
                    <Box
                      p={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Fireplace fontSize="large" />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </RadioGroup>
            <Typography variant="body2" color="error">
              {dataErrors.gender}
            </Typography>
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
              gap: "1rem",
              paddingTop: "8px",
            }}
          >
            {" "}
            <Typography variant="h4">How active are you?</Typography>
            <Typography
              variant="subtitle1"
              sx={{
                marginTop: "4px",
              }}
            >
              Don't worry, you can easily change your profile later.
            </Typography>
            <RadioGroup
              aria-label="activeLevel"
              name="activeLevel"
              value={data.activeLevel}
              onChange={(e) => handleDataChange("activeLevel", e.target.value)}
            >
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Paper elevation={3}>
                    <Box
                      p={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <FormControlLabel
                        value="sedentary"
                        control={<Radio />}
                        label="Sedentary"
                      />
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={3}>
                    <Box
                      p={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <FormControlLabel
                        value="moderate"
                        control={<Radio />}
                        label="Moderate"
                      />
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper elevation={3}>
                    <Box
                      p={2}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <FormControlLabel
                        value="active"
                        control={<Radio />}
                        label="Active"
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </RadioGroup>
            <Typography variant="body2" color="error">
              {dataErrors.activeLevel}
            </Typography>
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
              gap: "1rem",
              paddingTop: "8px",
            }}
          >
            <Typography variant="h4">All set up!</Typography>
            <Typography variant="h5">Let's get started!</Typography>
            <Typography variant="subtitle1">
              Click the button below to start your journey.
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  const submitData = () => {
    // covert height, weight, age to number
    const payload = { ...data };
    payload.id = currentUser.id;
    payload.height = Number(payload.height);
    payload.weight = Number(payload.weight);
    payload.age = Number(payload.age);
    payload.activityLevel = payload.activeLevel;

    onBoardUser(payload)
      .then((res) => {
        if (res.status === 200) {
          const updatedUser = { ...currentUser };
          updatedUser.weight = res.data.weight;
          updatedUser.height = res.data.height;
          updatedUser.age = res.data.age;
          updatedUser.gender = res.data.gender;
          updatedUser.activityLevel = res.data.activityLevel;
          updateCurrentUser(updatedUser);

          // wait for 2 seconds to let the user see the success message
          setTimeout(() => {
            navigate("/app/goals");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        background: "linear-gradient(to bottom, lightyellow, white)",
        height: "100%",
      }}
    >
      <Card
        raised
        sx={{
          width: "500px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
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
          <ArrowBackIcon onClick={handlePrevStep} />
          <SportsGymnasticsOutlined fontSize="large" />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "15px 15px 0px 15px",
          }}
        >
          <Typography variant="subtitle1">
            {step}/{totalSteps}
          </Typography>
          <Box mx={2} width="100%">
            <LinearProgress
              variant="determinate"
              value={(step / totalSteps) * 100}
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
            <Security fontSize="medium" />
            <Typography variant="subtitle1">
              All of your information is confidential.
            </Typography>
          </Box>
          {step < totalSteps ? (
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
              onClick={() => submitData()}
            >
              Finish
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default QuestionsCard;
