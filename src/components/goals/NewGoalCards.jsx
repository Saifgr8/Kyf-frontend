import React, { useState } from "react";
import "./NewGoalCardsCss.css";
import { setUserGoal } from "../../api-services/UrlService";
import { getCurrentUser } from "../../utils/CurrentUserDetails";
import { Box, Button, Typography } from "@mui/material";

function NewGoalCards({
  goalValues,
  type,
  info,
  img,
  demoIMG,
  blobBackgroundColor,
}) {
  const [active, setActive] = useState(false);
  const divStyle = {
    backgroundImage: active ? `url(${demoIMG})` : `url(${img})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  const user = getCurrentUser();

  const submitUserGoal = () => {
    console.log(goalValues);
    setUserGoal(user.id, { ...goalValues, dietType: type }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="card">
      <div className="bg" onClick={() => setActive(true)} style={divStyle}>
        {!active ? (
          <>
            <Typography variant="h4" component="div">
              Click for '{type}' macros:
            </Typography>
            <Typography variant="body1">{info}</Typography>
          </>
        ) : (
          <Box sx={{ marginTop: "5px", display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
            <Typography variant="h3" component="div">
              {type}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold",}}
              variant="h6"
              color="text.secondary"
            >
              Calories: {goalValues.calories}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h6"
              color="text.secondary"
            >
              Carbohydrates: {goalValues.carbs}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h6"
              color="text.secondary"
            >
              Fats: {goalValues.fat}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h6"
              color="text.secondary"
            >
              Proteins: {goalValues.protein}
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h6"
              color="text.secondary"
            >
              Sugars: {goalValues.sugars}
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
              <Button
                href="recipes"
                variant="contained"
                onClick={() => submitUserGoal()}
              >
                Select
              </Button>
            </Box>
          </Box>
        )}
      </div>

      <div
        className="blob"
        style={{ backgroundColor: blobBackgroundColor }}
      ></div>
    </div>
  );
}

export default NewGoalCards;
