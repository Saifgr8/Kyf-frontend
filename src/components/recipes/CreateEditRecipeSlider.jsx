import {
  Box,
  Button,
  Chip,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { macroStyles } from "./RecipeCard";
import FoodItemCard from "./FoodItemCard";
import { AddBoxOutlined, CloseOutlined } from "@mui/icons-material";
import SearchFoodComponent from "./SearchFoodComponent";
import { getCurrentUser, getUserGoal } from "../../utils/CurrentUserDetails";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../api-services/UrlService";

function CreateEditRecipeSlider({ onClose, reFetch, initialRecipe }) {
  const navigate = useNavigate();
  const [foodItemsModalOpen, setFoodItemsModalOpen] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const isEdit = initialRecipe ? true : false;
  const [user, setUser] = useState();
  const [recipe, setRecipe] = useState(
    initialRecipe || {
      name: "",
      description: "",
      ingredients: [],
      macros: {
        calories: 0,
        sugars: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
        fiber: 0,
      },
    }
  );

  const [tempIngredient, setTempIngredient] = useState(
    initialRecipe ? JSON.parse(JSON.stringify(initialRecipe.ingredients)) : []
  );

  const onSelectFoodItem = (foodItem) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, foodItem],
    }));
    setFoodItemsModalOpen(false);
    const copyFoodItem = JSON.parse(JSON.stringify(foodItem));
    setTempIngredient([...tempIngredient, copyFoodItem]);
  };

  useEffect(() => {
    const ingredients = recipe.ingredients;
    const totalMacros = ingredients.reduce(
      (acc, curr) => {
        acc.calories += curr.macros.calories;
        acc.sugars += curr.macros.sugars;
        acc.fat += curr.macros.fat;
        acc.protein += curr.macros.protein;
        acc.carbs += curr.macros.carbs;
        acc.fiber += curr.macros.fiber;
        return acc;
      },
      {
        calories: 0,
        sugars: 0,
        fat: 0,
        protein: 0,
        carbs: 0,
        fiber: 0,
      }
    );
    setRecipe((prev) => ({ ...prev, macros: totalMacros }));
  }, [recipe.ingredients]);

  useEffect(() => {
    setSlideIn(true);
    getUser(getCurrentUser().id).then((res) => {
      if (!res.data.userGoal) {
        alert("Please set your user goal");
        navigate("/app/onboard", { replace: true });
      }

      setUser(res.data);
    });
  }, []);

  const handleSliderClose = () => {
    setSlideIn(false);
    setTimeout(onClose, 1000);
  };

  const openFoodItemsModal = () => {
    setFoodItemsModalOpen(true);
  };

  const handleNameChange = (e) => {
    setRecipe((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setRecipe((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleDelete = (name) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((item) => item.name !== name),
    }));
    setTempIngredient((prev) => prev.filter((item) => item.name !== name));
  };

  const handleSave = () => {
    if (isEdit) {
      axios
        .put(`https://kyf-backend.azurewebsites.net/api/recipe/${recipe.id}`, recipe)
        .then((res) => {
          reFetch();
          alert("Recipe updated successfully");
        });
    } else {
      const user = getCurrentUser();
      const newRecipe = {
        ...recipe,
        owner: user.id,
      };

      axios.post("https://kyf-backend.azurewebsites.net/api/recipe", newRecipe).then((res) => {
        reFetch();
        alert("Recipe created successfully");
      });
    }
    handleSliderClose();
  };

  const isNotNaN = (value) => {
    if (isNaN(value)) {
      return 0;
    }
    return Math.round(value);
  };

  const handleUpdateAmount = (name, prev, newAmount) => {
    const updatedIngredientItem = tempIngredient.find(
      (item) => item.name === name
    );

    const newIngredients = recipe.ingredients.map((item) => {
      if (item.name === name) {
        item.macros.calories = isNotNaN(
          updatedIngredientItem.macros.calories *
            (newAmount / updatedIngredientItem.amount)
        );
        item.macros.sugars = isNotNaN(
          updatedIngredientItem.macros.sugars *
            (newAmount / updatedIngredientItem.amount)
        );
        item.macros.fat = isNotNaN(
          updatedIngredientItem.macros.fat *
            (newAmount / updatedIngredientItem.amount)
        );
        item.macros.protein = isNotNaN(
          updatedIngredientItem.macros.protein *
            (newAmount / updatedIngredientItem.amount)
        );
        item.macros.carbs = isNotNaN(
          updatedIngredientItem.macros.carbs *
            (newAmount / updatedIngredientItem.amount)
        );
        item.macros.fiber = isNotNaN(
          updatedIngredientItem.macros.fiber *
            (newAmount / updatedIngredientItem.amount)
        );
        item.amount = newAmount;
      }
      return item;
    });
    setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const calculatePercentage = (num, dem) => {
    if (dem === 0 || isNaN(dem)) {
      return 0;
    }
    return Math.round((num / dem) * 100);
  };

  const [alertShown, setAlertShown] = useState(false);

  const checkForExceedingValue = () => {
    for (const key in recipe.macros) {
      const percentage = calculatePercentage(recipe.macros[key], user?.userGoal[key]);
      if (percentage > 100) {
        setAlertShown(true);
        window.alert(`Value exceeded at ${key}: ${percentage}%`);
      }
    }
  };

  if (!alertShown) {
    checkForExceedingValue();
  }

  return (
    <Box
      sx={{
        position: "fixed",
        width: "25%",
        background: "linear-gradient(to bottom, white, lightyellow)",
        height: "100vh",
        height: "95vh",
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
      <Modal
        open={foodItemsModalOpen}
        onClose={() => setFoodItemsModalOpen(false)}
        aria-labelledby="Search Food Items"
        aria-describedby="Search Food Items"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            width: "60%",
            p: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              paddingBottom: "10px",
              borderBottom: "3px solid #e0e0e0",
            }}
          >
            <Typography variant="h5">Select Food Items</Typography>
            <CloseOutlined onClick={() => setFoodItemsModalOpen(false)} />
          </Box>
          <SearchFoodComponent onSelectFoodItem={onSelectFoodItem} />
        </Box>
      </Modal>
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
        <Typography variant="h4">
          {isEdit ? "Edit Recipe" : "Create New Recipe"}
        </Typography>
        <IconButton onClick={handleSliderClose}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <TextField
        id="outlined-basic"
        size="small"
        label="Name"
        variant="outlined"
        sx={{
          margin: "15px 0px",
          width: "50%",
        }}
        value={recipe.name}
        onChange={handleNameChange}
      />
      <TextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        multiline
        rows={2}
        sx={{
          margin: "0px 0px 25px 0px",
        }}
        value={recipe.description}
        onChange={handleDescriptionChange}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "10px",
          borderTop: "3px solid #e0e0e0",
          borderBottom: "3px solid #e0e0e0",
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
        <Box
          sx={{
            display: "flex",
            width: "60%",
            flexDirection: "column",
            marginBottom: "8px",
          }}
        >
          {recipe?.macros &&
            Object.keys(recipe?.macros).map((key, index) => (
              <Box
                key={index}
                sx={{
                  margin: "5px",
                  display: "flex",
                  alignItems: "center",
                  justifyContents: "center",
                  width: "120%",
                  // border: "1px solid #e0e0e0",
                  gap: "10px",
                }}
              >
                {/* see here */}

                <Chip
                  label={`${key}: ${recipe.macros[key]} / ${user?.userGoal[key]}`}
                  style={{ ...macroStyles[key] }}
                  sx={{ fontSize: "16px" }}
                />
                <Box
                  sx={{
                    width: "45px",
                    height: "45px",
                  }}
                >
                  <CircularProgressbar
                    value={calculatePercentage(
                      recipe.macros[key],
                      user?.userGoal[key]
                    )}
                    text={`${calculatePercentage(
                      recipe.macros[key],
                      user?.userGoal[key]
                    )}%`}
                    styles={buildStyles({
                      pathColor: `${macroStyles[key]?.backgroundColor}`,
                      textColor: "black",
                      trailColor: "#d6d6d6",
                      textSize: "30px",
                    })}
                  />
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            margin: "10px 0px",
          }}
        >
          Add Ingredients
        </Typography>
        <IconButton
          sx={{ margin: "0px 10px 0px 0px", color: "green" }}
          onClick={openFoodItemsModal}
        >
          <AddBoxOutlined sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {recipe.ingredients.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              margin: "10px 0px",
            }}
          >
            No Ingredients Added
          </Typography>
        ) : (
          recipe.ingredients.map((ingredient, index) => (
            <FoodItemCard
              key={index}
              foodItem={ingredient}
              onDeleteFoodItem={handleDelete}
              onUpdateAmount={handleUpdateAmount}
            />
          ))
        )}
      </Box>
      <Button
        sx={{ marginBottom: "10px", bottom: "10px" }}
        variant="contained"
        disabled={
          recipe.ingredients.length === 0 || !recipe.name || !recipe.description
        }
        onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  );
}

export default CreateEditRecipeSlider;
