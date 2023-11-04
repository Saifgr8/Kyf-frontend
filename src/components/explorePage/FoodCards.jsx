import { Box, Pagination } from "@mui/material";
import React, { useState } from "react";
import MediaCard from "./MediaCard";

function FoodCards({ foodItems, setClickedFoodItem, setModalOpen, onFoodItemClick }) {
  const itemsPerPage = 6; // Number of items to show per page
  const [page, setPage] = useState(1);

  const handleCardClick = (item) => {
   onFoodItemClick(item);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  const displayedItems = foodItems.slice(startIndex, endIndex);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "580px",
        width: "100%",
        marginLeft: "1.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: 'space-evenly',
          flexWrap: "wrap",
          boxShadow: 0,
          gap: "30px",
          paddingRight: '24px'
        }}
      >
        {displayedItems.map((d) => (
          <MediaCard
            key={d.name}
            foodItem={d}
            setSelectedItem={handleCardClick}
          />
        ))}
      </Box>
      <Pagination
        count={Math.ceil(foodItems.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ marginTop: "auto", marginBottom: "5px" }}
        shape="rounded"
        color="primary"
      />
    </Box>
  );
}

export default FoodCards;
