import React from "react";
import { Paper, Button } from "@mui/material";
import Image from "../../Image";
import './HomePageCss.css';

function Items({ item }) {

  // console.log(item.Title);
  return (
    <Paper className="CarouselItemPaper" elevation={2}>
      <Image imageName={item.imageName} height={300} width="100%" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <i>
          <h3>---{item.Title}---</h3>
        </i>
      </div>
      <Button
        href={item.Route}
        variant="contained"
        className="CheckButton"
        sx={{ left: "45%" }}
      >
        Check it out!
      </Button>
    </Paper>
  );
}

export default Items;
