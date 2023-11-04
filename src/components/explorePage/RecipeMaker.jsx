import { Button, Typography } from "@mui/material";
import React from "react";
import RecipeExploreCard from "./RecipeExploreCard";


function RecipeMaker({ selectedItems, setSelectedItems }) {

  const handleCrossClick = (name) => {

    var currentItems = [...selectedItems];
    currentItems = selectedItems.filter(item => item.name !== name);
    setSelectedItems(currentItems);
  }

  return (
    <div
      style={{
        width: "450px",
        display: "flex",
        flexDirection: "column",
        gap: 25,
        height: "91vh",
        position: "relative",
        marginLeft: '-10px'
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontFamily: "monospace", position: "sticky", marginTop: "30px", textAlign: 'center', padding: '5px' }}
      >
        Added Ingredients
      </Typography>
      <div style={{ flex: "1", overflowY: "auto", marginLeft: '10px'}}>
        {selectedItems &&
          selectedItems.map((item) => (
            <RecipeExploreCard foodItem={item} handleCrossClick={handleCrossClick} useSelectedAmount={selectedItems.grams}/>
          ))}
      </div>
      <Button variant="contained" sx={{ position: "sticky", bottom: 0, height: "55px" }}>
        Save Recipe
      </Button>
    </div>
  );
}

export default RecipeMaker;
