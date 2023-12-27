import { Box } from "@mui/material";
import React, { useState } from "react";
import SearchFoodComponent from "../recipes/SearchFoodComponent";
import Lottie from "lottie-react";
import exploregirl from "../../Videos/ExploreGirl.json";
import imageExp from '../../images/ExploreFullimgExploreVeg.jpeg';
import Footer from "../footer/Footer";

function ExploreFoodItems() {
  const [exploreButtonOff, setExploreButtonOff] = useState(true);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          background: "linear-gradient(to bottom, white, lightyellow)",
        }}
      >
        <Box
          sx={{
            height: "98vh",
          }}
        >
          <Lottie animationData={exploregirl} style={{ height: "800px" }} />
        </Box>
        <Box>
          <SearchFoodComponent exploreButtonOff={exploreButtonOff} />
        </Box>
      </Box>
      <div
        style={{
          paddingTop: "500px",
          background: "linear-gradient(to bottom, lightyellow, white )",
        }}
      >
        <Footer />
      </div>
    </>
  );
}

export default ExploreFoodItems;
