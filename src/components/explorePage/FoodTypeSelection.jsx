import { Autocomplete, Box, Button, Stack, TextField } from "@mui/material";
import React from "react";

function FoodTypeSelection({ type, setType, selectOptions, onSelectOption }) {
  return (
    <Box
      sx={{
        display: "flex",
        // marginLeft: -0.5,
        marginTop: 2,
        marginBottom: 4,
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Button
        variant={type === "Non-Veg" ? "contained" : "outlined"}
        sx={{ fontFamily: "monospace", height: "55px" }}
        onClick={() => setType("Non-Veg")}
      >
        Non-Veg
      </Button>
      <Button
        variant={type === "Veg" ? "contained" : "outlined"}
        sx={{ fontFamily: "monospace", height: "55px" }}
        onClick={() => setType("Veg")}
      >
        Veg
      </Button>
      <Button
        variant={type === "Fruits" ? "contained" : "outlined"}
        sx={{ fontFamily: "monospace", height: "55px" }}
        onClick={() => setType("Fruits")}
      >
        Fruits
      </Button>
      <Button
        variant={type === "Nuts" ? "contained" : "outlined"}
        sx={{ fontFamily: "monospace", height: "55px" }}
        onClick={() => setType("Nuts")}
      >
        Nuts
      </Button>
    </Box>
    
  );
}

export default FoodTypeSelection;
