import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import RecipeCard, { macroStyles } from "../recipes/RecipeCard";
import { getOwnerRecipes, getUser } from "../../api-services/UrlService";
import { getCurrentUser } from "../../utils/CurrentUserDetails";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const owner = getCurrentUser();

    const fetchOwnerRecipes = async () => {
      getOwnerRecipes(owner?.id).then((response) => {
        setRecipes(response?.data || []);
        // setSelectedRecipes(response?.data[0]);
      });
    };

    getUser(owner?.id).then((response) => {
      setUser(response?.data);
      if (response?.data?.userGoal) {
        console.log(response?.data?.userGoal);
        fetchOwnerRecipes();
      } else {
        alert("Please set your user goal");
        navigate("/app/onboard", { replace: true });
      }
    });
  }, []);

  const onSelectRecipeCard = (recipe) => {
    if (!selectedRecipes) {
      setSelectedRecipes([recipe]);
      return;
    }

    const index = selectedRecipes.indexOf(recipe);
    if (index > -1) {
      const newSelectedRecipes = [...selectedRecipes];
      newSelectedRecipes.splice(index, 1);
      setSelectedRecipes(newSelectedRecipes);
    } else {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
  };

  const createBarChart = (label, data, unit) => {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: `${label} Chart`,
        },
      },
      scales: {
        y: {
          stacked: true,
        },
        x: {
          stacked: true,
          title: {
            display: true,
            text: `${label} (${unit})`,
          }
        },
      },
    };
    const labels = [label];

    const userGoalData = user?.userGoal[label.toLowerCase()] || 0;

    const userGoalDataset = {
      label: `User Goal ${label}`,
      data: [userGoalData],
      backgroundColor: macroStyles[label.toLowerCase()].color,
      stack: "stack 0",
    };

    const calculateBarColor = (index) => {
      const colors = [
        "#ffcc80",
        "#b2dfdb",
        "#b39ddb",
        "#81d4fa",
        "#ffab91",
        "#c5e1a5",
      ];
      return colors[index % colors.length];
    };

    const selectedRecipesDataSet = selectedRecipes
      ? selectedRecipes.map((recipe, index) => {
          // create a dataset for each recipe,
          // with the recipe name as the label
          // and the macro value as the data
          // random color for the background
          return {
            label: recipe.name,
            data: [recipe.macros[label.toLowerCase()] || 0],
            backgroundColor: calculateBarColor(index),
            stack: "stack 1",
          };
        })
      : [];

    const chartData = {
      labels,
      datasets: [userGoalDataset, ...selectedRecipesDataSet],
    };

    return (
      <Box
        sx={{
          width: "45%",
          height: "30%",
          backgroundColor: "white",
          border: "1px solid black",
          borderRadius: "5px",
        }}
      >
        <Bar options={options} data={chartData} />
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "60%",
          height: "91.8vh",
          background: "linear-gradient(to bottom, white, lightyellow)",
          borderRight: "2px solid black",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "space-evenly",
          alignItems: "space-between",
          paddingTop: "10px",
        }}
      >
        {createBarChart("Calories", "calories", "kcal")}
        {createBarChart("Carbs", "carbs", "grams")}
        {createBarChart("Fat", "fat", "grams")}
        {createBarChart("Protein", "protein", "grams")}
        {createBarChart("Sugars", "sugars", "grams")}
        {createBarChart("Fiber", "fiber", "grams")}
      </Box>
      <Box
        sx={{
          width: "40%",
          height: "91.8vh",
          overflow: "scroll",
          background: "linear-gradient(to bottom, white, lightyellow)",
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
          p: 2,
        }}
      >
        {recipes &&
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.name}
              recipe={recipe}
              selected={selectedRecipes?.includes(recipe)}
              readOnly={true}
              handleCardClick={onSelectRecipeCard}
            />
          ))}
      </Box>
    </Box>
  );
}

export default Dashboard;
