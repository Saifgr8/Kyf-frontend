import React, { useState } from "react";
import "./Contact.css";
import Footer from "../footer/Footer";

import Lottie from "lottie-react";
import Halloween from "../../Videos/Halloween.json";
import { Button, Typography } from "@mui/material";
import ContactModal from "./ContactModal";

function Contact() {
  const [isModalOneOpen, setModalOneOpen] = useState(false);

  const openModalOne = () => {
    setModalOneOpen(true);
  };


  return (
    <>
      <div className="TopDiv">
        <div className="Typo">
          <Typography variant="h4">From the team of KYF</Typography>
          <Typography variant="h1">Happy Halloween :3</Typography>
          <Typography variant="body1">
            Thank you for sticking with us..
          </Typography>
        </div>
        <div className="ButtonDivs1">
          <Button variant="outlined" onClick={openModalOne}>
            Click me
          </Button>
          <Typography variant="h4" sx={{ paddingLeft: "10px" }}>
            for Feedback
          </Typography>
        </div>
        <Lottie animationData={Halloween} />
        <ContactModal open={isModalOneOpen} handleClose={() => setModalOneOpen(false)} />
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Contact;
