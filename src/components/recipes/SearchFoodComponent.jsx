import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Collapse,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Lottie from "lottie-react";
import RMgif from "../../Videos/RMgif.json";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "../../Image";
import FoodCards from "../explorePage/FoodCards";
import FoodTypeSelection from "../explorePage/FoodTypeSelection";
import { macroStyles } from "./RecipeCard";

function SearchFoodComponent({ onSelectFoodItem, exploreButtonOff }) {
  const [data, setData] = useState([]);
  const [type, setType] = useState("Non-Veg");
  const [filteredData, setFilteredData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState({
    name: "",
    amount: 100,
    macros: {
      calories: 0,
      sugars: 0,
      fat: 0,
      protein: 0,
      carbs: 0,
      fiber: 0,
    },
  });
  const [grams, setGrams] = useState(100);
  const [macros, setMacros] = useState({
    calories: 0,
    sugars: 0,
    fat: 0,
    protein: 0,
    carbs: 0,
    fiber: 0,
    });

    useEffect(() => {
    const newMacros = {
        calories: isNotNaN((grams * selectedFood.calories) / 100),
        sugars: isNotNaN((grams * selectedFood.sugars) / 100),
        fat: isNotNaN((grams * selectedFood.fat) / 100),
        protein: isNotNaN((grams * selectedFood.protein) / 100),
        carbs: isNotNaN((grams * selectedFood.carbs) / 100),
        fiber: isNotNaN((grams * selectedFood.fiber) / 100),
    };
    setMacros(newMacros);
    }, [grams, selectedFood]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://kyf-backend.azurewebsites.net/api/food");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length) {
      const filteredItems = data.filter((item) => item.type === type);
      setFilteredData(filteredItems);
    }
  }, [type, data]);

  const onSelectOption = (value) => {
    const item = data.find((d) => d.name === value);
    setFilteredData([item]);
  };

  const isNotNaN = (value) => {
    if (isNaN(value)) {
        return 0;
    }
    return Math.round(value);
};

  const handleFoodCardClick = (food) => {    
    setSelectedFood(food);
    setDrawerOpen(true);
  };

  const addFoodItemClick = (food) => {

    const newFood = {
        name: food.name,
        amount: grams,
        macros: macros,
        type: food.type,
    };

    onSelectFoodItem(newFood);
    setTimeout(() => {}, 1000);
    setDrawerOpen(false);
  };
  

  const CustomBottomDrawer = (selectedFood) => {
    return (
      <Collapse
        in={drawerOpen}
        timeout={600}
        sx={{
          position: "absolute",
          bottom: drawerOpen ? 0 : "-100%",
          width: "100%",
          zIndex: 1000,
          height: "500px",
          padding: "2rem",
          transition: "bottom 0.6s ease-in-out",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          boxShadow: "0 0 20px rgba(0,0,0,0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #ccc",
            paddingBottom: "1rem",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <Typography variant="h6">
            Add {selectedFood?.name} to your recipe.
          </Typography>
          <KeyboardArrowDown
            onClick={() => setDrawerOpen(false)}
            sx={{ cursor: "pointer" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" sx={{ marginLeft: "1rem" }}>
              {selectedFood?.name}
            </Typography>
            <Image
              imageName={selectedFood?.name || "test"}
              width="260px"
              height="300px"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginLeft: "1rem",
                marginBottom: "-4rem",
              }}
            >
              Quantity
            </Typography>
            <Lottie animationData={RMgif} />
            <TextField
              id="standard-basic"
              label="Grams"
              variant="standard"
              type="number"
              onChange={(e) => setGrams(Number(e.target.value))}
              width="180px"
              sx={{ marginTop: "-2rem" }}
              value={grams}
            />

            {/* do here */}

            {!exploreButtonOff && <Button
              variant="contained"
              size="large"
              onClick={() => addFoodItemClick(selectedFood)}
              width="182px"
              sx={{ marginTop: "1.2rem" }}
            >
              Add
            </Button>}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "40%",
              height: "100%",
            }}
          >
            <Typography variant="h5">Micro Nutritions</Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              {Object.keys(macros).map((key, index) => (
                <Box key={index} sx={{ margin: "10px" }}>
                  <Chip
                    label={`${key}: ${macros[key]}`}
                    style={{ ...macroStyles[key] }}
                    sx={{ fontSize: "20px", width: "150px" }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Collapse>
    );
  };
  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <FoodTypeSelection type={type} setType={setType} />
        <Stack spacing={2} sx={{ width: 400 }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={data.map((option) => option.name)}
            onChange={(event, newValue) => {
              onSelectOption(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search food item"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Stack>
      </Box>
      <FoodCards
        foodItems={filteredData}
        onFoodItemClick={handleFoodCardClick}
      />
      {selectedFood && CustomBottomDrawer(selectedFood)}
    </Box>
  );
}

export default SearchFoodComponent;
