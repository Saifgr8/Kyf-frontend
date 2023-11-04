import { Box, Button, Snackbar, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Lottie from "lottie-react";
import RecipeCard from "./RecipeCard";
import RMgif from "../../Videos/RMgif.json";
import RecipeDetailSliderView from "./RecipeDetailSliderView";
import CreateEditRecipeSlider from "./CreateEditRecipeSlider";
import { useEffect } from "react";
import axios from "axios";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showCreateRecipe, setShowCreateRecipe] = useState(false);
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);
  const [reFetch, setReFetch] = useState(false);

  useEffect(() => {
    const fetchOwnerRecipes = async () => {
      const response = await axios.get("http://localhost:8080/api/recipe");
      setRecipes(response.data);
    };
    fetchOwnerRecipes();
  }, [reFetch]);

  const handleRecipeCardClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipeDetail(true);
  };

  const ZeroRecipes = () => {
    return (
      <div>
        <h1>Recipes</h1>
        <p>You haven't added any recipes yet.</p>
      </div>
    );
  };

  return (
    <Box>
      {recipes.length === 0 ? (
        <ZeroRecipes />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            width: "75%",
          }}
        >
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.name}
              recipe={recipe}
              handleRecipeCardClick={handleRecipeCardClick}
              handleEditIconClick={() => {
                setShowCreateRecipe(true);
                setSelectedRecipe(recipe);
              }}
              selected={selectedRecipe?.name === recipe.name}
              reFetch={() => setReFetch(!reFetch)}
            />
          ))}
          {showRecipeDetail && selectedRecipe && (
            <RecipeDetailSliderView
              recipe={selectedRecipe}
              onClose={() => {setSelectedRecipe(null); setShowRecipeDetail(false);}}
              reFetch={() => setReFetch(!reFetch)}
              onEditClick={() => {
                setSelectedRecipe(selectedRecipe);
                setShowRecipeDetail(false);
                setShowCreateRecipe(true);
              }}
            />
          )}
        </Box>
      )}
      <Box
        sx={{
          position: "fixed",
          width: "25%",
          backgroundColor: "#f8f8f8",
          height: "100vh",
          right: 0,
          top: 70,
          borderLeft: "1px solid #e0e0e0",
          boxShadow: "-10px 0px 10px -10px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginTop: 3,
            padding: 2,
          }}
        >
          Create Recipes
        </Typography>
        <Lottie animationData={RMgif} />
        <Typography
          variant="body1"
          sx={{
            marginTop: 2,
            marginBottom: 4,
            padding: 2,
          }}
        >
          Create your own recipes and add them to your meal plan.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateRecipe(!showCreateRecipe)}
        >
          Create Recipe
        </Button>
        {showCreateRecipe && (
          <CreateEditRecipeSlider
            reFetch={() => setReFetch(!reFetch)}
            onClose={() => {setShowCreateRecipe(false); setSelectedRecipe(null); }}
            initialRecipe={selectedRecipe}
          />
        )}
      </Box>
    </Box>
  );
}

export default Recipes;
