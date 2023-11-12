import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./RecipeCard.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardHeader,
  Chip,
  IconButton,
} from "@mui/material";
import axios from "axios";

export const macroStyles = {
  calories: { backgroundColor: "#ffcc80", color: "#e65100" },
  sugars: { backgroundColor: "#b2dfdb", color: "#00796b" },
  fat: { backgroundColor: "#b39ddb", color: "#4a148c" },
  protein: { backgroundColor: "#81d4fa", color: "#01579b" },
  carbs: { backgroundColor: "#ffab91", color: "#bf360c" },
  fiber: { backgroundColor: "#c5e1a5", color: "#33691e" },
};

export const convertToDateText = (date) => {
  const months = [
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

  const day = date[2];
  const monthIndex = date[1] - 1;
  const year = date[0];

  return `${day}th ${months[monthIndex]} ${year}`;
};
const RecipeCard = ({
  recipe,
  handleRecipeCardClick,
  handleEditIconClick,
  reFetch,
  selected,
  small,
  readOnly,
  handleCardClick,
}) => {
  const handleSeeDetailsClick = () => {
    handleRecipeCardClick(recipe);
  };

  const handleCardClick1 = () => {
    if(handleCardClick) handleCardClick(recipe);
  };
  const handleEditClick = () => {
    handleEditIconClick(recipe);
  };

  const handleDeleteClick = () => {
    axios
      .delete(`http://localhost:8080/api/recipe/${recipe.id}`)
      .then((res) => {
        alert("Recipe deleted successfully");
        reFetch();
      })
      .catch((err) => {
        console.log(err);
        alert("Error deleting recipe");
      });
  };

  const getRecipeTypeLogo = () => {
    var isNonVeg = false;
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.type === "Non-Veg") {
        isNonVeg = true;
        return;
      }
    });
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "12px 8px 0px 10px",
          height: "18px",
          width: "18px",
          border: isNonVeg ? "2px solid red" : "2px solid green"
        }}
      >
        <Box
          sx={{
            height: "8px",
            width: "8px",
            bgcolor: isNonVeg ? "red" : "green",
            borderRadius: "50%",
          }}
        />
      </Box>
    );
  };

  const cardFrontView = () => {
    return (
      <Box className="card-front1">
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: "red",
                width: "32px",
                height: "32px",
                fontSize: "15px",
              }}
              aria-label="recipe"
            >
              {recipe?.name && recipe.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={getRecipeTypeLogo()}
          title={recipe.name || "My Recipe"}
          subheader={convertToDateText(recipe.updatedAt)}
          titleTypographyProps={{ variant: "h6", fontWeight: "bold" }}
          sx={{ borderBottom: "1px solid #e0e0e0" }}
        />
        <CardContent
          sx={{
            padding: "3px 16px 1px 17px",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              fontWeight: "normal",
              color: "#757590",
              margin: "8px 0px 4px 0px",
            }}
          >
            {recipe.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "16px",
              fontWeight: "normal",
              color: "#757590",
              margin: "4px 0px 8px 0px",
            }}
          >
            Total Ingredients: {recipe.ingredients.length}
          </Typography>
        </CardContent>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            fontWeight: "normal",
            color: "#757575",
            margin: "auto 4px 4px 14px",
          }}
        >
          Last modified at {convertToDateText(recipe.updatedAt)}
        </Typography>
      </Box>
    );
  };

  const cardBackView = () => {
    return (
      <Box className="card-back1" sx={{ backgroundColor: "#f4f3f3" }}>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: "bold",
                marginBottom: "15px",
                color: "black",
                borderBottom: "1px solid #000",
              }}
            >
              Macronutrients
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: "8px",
              }}
            >
              {Object.keys(recipe.macros).map((key, index) => (
                <Box key={index} sx={{ margin: "5px" }}>
                  <Chip
                    label={`${key}: ${recipe.macros[key]}`}
                    style={{ ...macroStyles[key] }}
                    sx={{ fontSize: "16px" }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "flex-end", padding: 0 }}
        >
          {!readOnly && (<Button
            size="small"
            onClick={handleSeeDetailsClick}
            sx={{ margin: "0px auto 0px 12px" }}
          >
            See Details
          </Button>)}
          {!readOnly && (<IconButton onClick={handleEditClick} sx={{ color: "#e65100" }}>
            <EditIcon />
          </IconButton>)}
          {!readOnly && (<IconButton onClick={handleDeleteClick} sx={{ color: "#c62828" }}>
            <DeleteIcon />
          </IconButton>)}
        </CardActions>
      </Box>
    );
  };

  return (
    <Card className={selected ?  "recipe-card1-selected" : "recipe-card1"} elevation={5}
    onClick={handleCardClick1}
    >
      <div className="card-inner1">
        {cardFrontView()}
        {cardBackView()}
      </div>
    </Card>
  );
};

export default RecipeCard;
