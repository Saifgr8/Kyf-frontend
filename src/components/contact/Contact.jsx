import React, { useState } from "react";
import "./Contact.css";
import Footer from "../footer/Footer";

import Lottie from "lottie-react";
import Halloween from "../../Videos/Halloween.json";
import { Button, Typography } from "@mui/material";
import ContactModal from "./ContactModal";
import ContactModalProblem from "./ContactModalProblem";

function Contact() {
  const [isModalOneOpen, setModalOneOpen] = useState(false);
  const [isModalTwoOpen, setModalTwoOpen] = useState(false);

  const openModalOne = () => {
    setModalOneOpen(true);
    setModalTwoOpen(false);
  };

  const openModalTwo = () => {
    setModalTwoOpen(true);
    setModalOneOpen(false);
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
        <div className="ButtonDivs2">
          <Button variant="outlined" onClick={openModalTwo}>
            Click me
          </Button>
          <Typography variant="h4" sx={{ paddingLeft: "10px" }}>
            to Complain
          </Typography>
        </div>
        <ContactModal open={isModalOneOpen} handleClose={() => setModalOneOpen(false)} />
        <ContactModalProblem open2={isModalTwoOpen} handleClose2={() => setModalTwoOpen(false)} />
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Contact;
