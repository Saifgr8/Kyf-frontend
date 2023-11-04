import React,{useState} from "react";
import './GoalCards.css';
import BulkImg from "../../images/Cutimg.avif";
import CutImg from "../../images/Bulkimg.avif";
import MaintainImg from "../../images/Maintainimg.jpeg";
import { Button } from "@mui/material";
import { getCurrentUser } from "../../utils/CurrentUserDetails.js";
import { useEffect } from "react";
import calculateMacronutrients from "../../utils/calculateMacronutrients.js";
import NewGoalCards from "./NewGoalCards.jsx";
import demoIMG from '../../images/BackImgCard.jpeg'
import DescriptionCard from "./DescriptionCard";

const cutinfo =
  "It involves creating a caloric deficit, emphasizing high protein intake, controlling carbohydrate and fat consumption, and combining it with cardio and strength training exercises. The goal is to achieve a lean and defined physique. Individual adjustments are essential, and it's crucial to monitor progress and prioritize overall health during this process.";

const bulkinfo =
  "During a bulk, individuals typically consume a surplus of calories to support muscle growth and strength development. This phase often involves high-protein diets, strength training, and progressive resistance exercises. The goal is to maximize muscle gain while accepting some increase in body fat.";
const maintaininfo =
  "Maintenance calories refer to the number of calories an individual needs to consume in a day to maintain their current body weight, without gaining or losing weight. It serves as a baseline for designing diets or fitness plans, allowing individuals to control their weight by adjusting calorie intake above or below maintenance as needed to achieve their goals.";



function SetGoalsPage() {
  const currentUser = getCurrentUser();

  return (
    <div id="SetGoalPage">
      <DescriptionCard />
      <div id="GoalCard">
        <NewGoalCards
          type="Cut"
          img={CutImg} 
          demo={demoIMG}
          blobBackgroundColor="green"
          goalValues={calculateMacronutrients(
            currentUser.weight,
            currentUser.height,
            currentUser.age,
            currentUser.gender,
            currentUser.activityLevel,
            "cut"
          )}
        />
        <NewGoalCards
          type="Maintain"
          img={MaintainImg}
          demo={demoIMG}
          blobBackgroundColor="blue"
          goalValues={calculateMacronutrients(
            currentUser.weight,
            currentUser.height,
            currentUser.age,
            currentUser.gender,
            currentUser.activityLevel,
            "maintain"
          )}
        />
        <NewGoalCards
          type="Bulk"
          img={BulkImg}
          demo={demoIMG}
          blobBackgroundColor="red"
          goalValues={calculateMacronutrients(
            currentUser.weight,
            currentUser.height,
            currentUser.age,
            currentUser.gender,
            currentUser.activityLevel,
            "bulk"
          )}
        />
      </div>
      <Button  sx={{marginTop: '80px', marginLeft: '630px'}}
      size="large" variant="contained" href="onboard">
        Edit your goals
      </Button>
    </div>
  );
}

export default SetGoalsPage;
