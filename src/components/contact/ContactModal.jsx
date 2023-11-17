import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import Inputforms from "./Inputforms";
import Lottie from "lottie-react";
import ghost from "../../Videos/Ghost.json";
import light from "../../Videos/FBlightning.json";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 900,
  bgcolor: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ContactModal({ open, handleClose }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Lottie
          animationData={light}
          style={{ position: "absolute", marginTop: "200px" }}
        />
        <Lottie
        className="ghost"
          animationData={ghost}
          style={{ position: "absolute", marginTop: "500px", height: "300px", marginLeft: '250px' }}
        />
        <form style={{ backgroundColor: "black" }}>
          <Inputforms />
        </form>
      </Box>
    </Modal>
  );
}

export default ContactModal;
