import React from "react";
import { Modal, Typography, Button, Box } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import { useNavigate } from 'react-router-dom';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "white",
  border: "2px solid #000",
  p: 4,
};


function ContactModalProblem({ open2, handleClose2 }) {
  const navigate = useNavigate();

  const handleAlertClick = () => {
    window.alert("Message received, working shortly :)");
    navigate('/app');
  }
  return (
    <Modal sx={style} open={open2} onClose={handleClose2}>
      <Box sx={{ p: 2, width: "300px" }}>
        <Textarea
          placeholder="Your message will be delivered to me, please type..."
          minRows={4}
          maxRows={4}
          sx={{ width: "400px", height: "200px" }}
        />
        <Button
          onClick={handleAlertClick}
          variant="contained"
          sx={{ ml: "auto" }}
        >
          Send
        </Button>
      </Box>
    </Modal>
  );
}

export default ContactModalProblem;
