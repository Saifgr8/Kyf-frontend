import { Box } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function RecipeExploreCard({ foodItem, handleCrossClick }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const crossClick = (e) => {
    e.preventDefault();
    handleCrossClick(foodItem.name);
  };

  return (
    <>
      <Card
        // onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "69px",
          boxShadow: 2,
          backgroundColor: "#7895CB",
          marginTop: "5px",
         
          border: "1px solid black",
          
          transition: "box-shadow 0.3s",
          "&:hover": {
            cursor: "pointer",
            boxShadow: "8px 8px 8px 12px #A0BFE0",
            borderRadius: "10px",
          },
        }}
      >
        <Typography
          gutterBottom
          variant="subtitle1"
          sx={{ margin: 2, fontFamily: "monospace" }}
        >
          {foodItem.name}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          sx={{
            marginLeft: "auto",
            fontFamily: "monospace",
            marginRight: "20px",
          }}
        >
          {foodItem.grams + " grams"}
        </Typography>
        {open ? (
          <ArrowDropUpIcon
            sx={{ marginRight: "5px", marginBottom: "2px" }}
            color="primary"
            fontSize="large"
            onClick={handleClick}
          />
        ) : (
          <ArrowDropDownIcon
            sx={{ marginRight: "5px", marginBottom: "2px" }}
            color="primary"
            fontSize="large"
            onClick={handleClick}
          />
        )}
          <DeleteOutlineIcon
            sx={{ marginRight: "5px", marginBottom: "2px" }}
            color="primary"
            fontSize="large"
            onClick={(e) => crossClick(e)}
          />
      </Card>
      {open && (
        <Card
          sx={{
            padding: "10px",
            width: "100%",
            overflow: "auto",
            
            backgroundColor: "#C5DFF8",
            
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
              Calorie :{foodItem.calories}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
              Carbohydrates :{foodItem.carbohydrates}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
              Fats : {foodItem.fat}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
              Protiens : {foodItem.protein}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
              Sugar : {foodItem.sugars}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
              Fiber : {foodItem.fiber}
            </Typography>
          </Box>
        </Card>
      )}
    </>
  );
}

export default RecipeExploreCard;
