import {
  Box,
  Button,
  Chip,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { convertToDateText, macroStyles } from "./RecipeCard";
import FoodItemCard from "./FoodItemCard";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

function RecipeDetailSliderView({ recipe, onClose, reFetch, onEditClick }) {
  const [slideIn, setSlideIn] = useState(false);
  const [macroOpen, setMacroOpen] = useState(true);
  const [ingredientsOpen, setIngredientsOpen] = useState(true);

  useEffect(() => {
    setSlideIn(true);
  }, []);

  const handleSliderClose = () => {
    setSlideIn(false);
    setTimeout(onClose, 1000);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        width: "25%",
        backgroundColor: "#f8f8f8",
        height: "100vh",
        top: 70,
        right: slideIn ? 0 : "-25%",
        borderLeft: "1px solid #e0e0e0",
        transition: "right 1s",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          margin: "8px 4px 0px 4px",
          paddingBottom: "10px",
          borderBottom: "3px solid #e0e0e0",
        }}
      >
        <Typography variant="h4">Recipe Details</Typography>
        <IconButton onClick={handleSliderClose}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "10px 0px",
        }}
      >
        <Typography variant="h6" fontWeight={500}>
          Name:
        </Typography>
        <Typography variant="h6">{recipe.name}</Typography>
      </Box>
      <Typography variant="h6" fontWeight={500}>
        Description:
      </Typography>
      <Typography variant="body1">{recipe.description}</Typography>

      <Typography
        variant="body2"
        sx={{
          margin: "10px 0px",
          borderBottom: "3px solid #e0e0e0",
          paddingBottom: "10px",
        }}
      >
        Created At: {convertToDateText(recipe.createdAt)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "10px",
          borderBottom: "3px solid #e0e0e0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              margin: "10px 0px",
            }}
          >
            Macronutrients
          </Typography>
          <IconButton size="medium" onClick={() => setMacroOpen(!macroOpen)}>
            {macroOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Box>
        <Collapse in={macroOpen} timeout="auto" unmountOnExit>
          <Box
            sx={{
              display: "flex",
              width: "60%",
              flexDirection: "row",
              flexWrap: "wrap",
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
        </Collapse>
      </Box>
      <Box sx={{overflow: 'auto'}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              margin: "10px 0px",
            }}
          >
            Ingredients
          </Typography>
          <IconButton
            size="medium"
            onClick={() => setIngredientsOpen(!ingredientsOpen)}
          >
            {ingredientsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Box>
        <Collapse in={ingredientsOpen} timeout="auto" unmountOnExit>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              maxHeight: "20vh",
              gap: "10px",
              overflow: "auto",
            }}
          >
            {recipe.ingredients.map((ingredient, index) => (
              <FoodItemCard key={index} foodItem={ingredient} />
            ))}
          </Box>
        </Collapse>
        <Button
          variant="contained"
          sx={{
            marginTop: "10px",
          }}
          onClick={onEditClick}
        >
          Edit
        </Button>
      </Box>
    </Box>
  );
}

export default RecipeDetailSliderView;
