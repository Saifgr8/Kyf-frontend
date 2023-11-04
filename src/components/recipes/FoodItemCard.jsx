import React, { useState } from "react";
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  Delete,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

// const min = 1;
// const max = 1000000;

const FoodItemCard = ({ foodItem, onDeleteFoodItem, onUpdateAmount }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getFoodItemAmount = (foodItem) => {
    if (onUpdateAmount) {
      return (
        <TextField
          size="small"
          variant="standard"
          value={foodItem?.amount}
          onChange={
            (e) =>
              onUpdateAmount(
                foodItem?.name,
                Number(foodItem?.amount),
                Number(e.target.value)
              )
          }
          sx={{
            marginRight: "10px",
            width: "80px",
          }}
        />
      );
    }
    return (
      <Typography
        variant="body1"
        sx={{
          marginRight: "10px",
        }}
      >
        {foodItem?.amount} gm
      </Typography>
    );
  };
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            marginRight: "auto",
          }}
        >
          {foodItem?.name}
        </Typography>
        {getFoodItemAmount(foodItem)}
        <IconButton size="small" onClick={handleExpandClick}>
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
        {onDeleteFoodItem && (
          <IconButton size="small">
            <Delete onClick={() => onDeleteFoodItem(foodItem?.name)} />
          </IconButton>
        )}
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            borderTop: "2px solid #e0e0e0",
            marginTop: "10px",
          }}
        >
          {Object.entries(foodItem.macros).map(([key, value]) => (
            <Chip
              key={key}
              label={`${key}: ${value}`}
              sx={{
                margin: "5px",
                backgroundColor: "#e0e0e0",
                color: "#000000",
                fontSize: "14px",
              }}
            />
          ))}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default FoodItemCard;
