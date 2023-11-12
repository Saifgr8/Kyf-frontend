import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { getCurrentUser } from "../../utils/CurrentUserDetails";
import "./Dashboardinfo.css";
import { convertCentimeterToFeet } from "../goals/QuestionsCard";

function DashInfo() {
  const today = new Date();
  const day = today.getDate();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[today.getMonth()];

  return (
    // <Box sx={{display: 'flex', height: '300px', width: '25%'}}>
    //     <Box sx={{width: '15%'}}>
    //         <Typography>PIC</Typography>
    //     </Box>
    //     <Box sx={{width: '85%'}}>
    //         <Typography>User: {getCurrentUser().username}</Typography>
    //         <Typography>Email: {getCurrentUser().email}</Typography>
    //         <Typography>UserID: {getCurrentUser().id}</Typography>
    //         <Typography>Gender: {getCurrentUser().gender}</Typography>
    //         <Typography>Age: {getCurrentUser().age}</Typography>
    //         <Typography>Height: {getCurrentUser().height}</Typography>
    //         <Typography>Weight: {getCurrentUser().weight}</Typography>
    //         {/* <Button></Button> */}
    //     </Box>
    // </Box>
    <>
      <div class="book">
        <div>
          <p className="dashp">UserId: {getCurrentUser().id}</p>
          <p className="dashp">Username: {getCurrentUser().username}</p>
          <p className="dashp">Email: {getCurrentUser().email}</p>
          <p className="dashp">Gender: {getCurrentUser().gender}</p>
          <p className="dashp">Age: {getCurrentUser().age}</p>
          <p className="dashp">Height: {convertCentimeterToFeet(getCurrentUser().height)}</p>
          <p className="dashp">Weight: {getCurrentUser().weight}</p>
        </div>
        <div>
        <Button 
        href="app/onboard"
        variant="contained">Edit</Button>
      </div>
        <div class="cover">
          <h1 className="dashh1">Profile</h1>
          <h3 className="dashh3">{day}th {month}</h3>
        </div>
      </div>
      
    </>
  );
}

export default DashInfo;
