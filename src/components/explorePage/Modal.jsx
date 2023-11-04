import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { Card, TextField } from "@mui/material";
import Image from "../../Image";

export default function BasicModal({
  foodItem,
  modalOpen,
  setModalOpen,
  handleAddFoodItemSelection,
}) {
  const [grams, setGrams] = React.useState(0);

  const [macro, setMacro] = React.useState({});

  React.useEffect(() => {
    const newFooditem = { ...foodItem };
    newFooditem.calories = Math.round(newFooditem.calories * (grams / 100));
    newFooditem.protein = Math.round(newFooditem.protein * (grams / 100));
    newFooditem.carbohydrates = Math.round(
      newFooditem.carbohydrates * (grams / 100)
    );
    newFooditem.fat = Math.round(newFooditem.fat * (grams / 100));
    newFooditem.fiber = Math.round(newFooditem.fiber * (grams / 100));
    newFooditem.sugars = Math.round(newFooditem.sugars * (grams / 100));
    newFooditem.grams = grams;

    setMacro(newFooditem);
  }, [grams, foodItem]);

  const handleGramsChange = (value) => {
    setGrams(value);
  };

  const handleAddFoodItem = () => {
    handleAddFoodItemSelection(macro);
    handleModalClose();
  };

  const handleModalClose = () => {
    setGrams(0);
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: 400,
            width: 600,
            marginLeft: "-200px",
            bgcolor: "background.paper",
          }}
        >
          <Card
            sx={{
              width: "350px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image imageName={foodItem?.name}  width="260px" height="300px" />
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign={"center"}
              sx={{ fontFamily: "monospace" }}
            >
              {foodItem?.name}
            </Typography>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "250px",
              // justifyContent: "space-evenly",
              // alignItems: "center",
            }}
          >
            <CancelIcon
              onClick={handleModalClose}
              color="primary"
              sx={{ fontSize: 35, marginLeft: "215px", transition: "all 0.5s" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "30px",
                gap: "16px",
              }}
            >
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                Calorie : {isNaN(macro?.calories) ? 0 : macro?.calories}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                Carbohydrates :{" "}
                {isNaN(macro?.carbohydrates) ? 0 : macro?.carbohydrates}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                Fats : {isNaN(macro?.fat) ? 0 : macro?.fat}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                Protiens : {isNaN(macro?.protein) ? 0 : macro?.protein}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                Sugar : {isNaN(macro?.sugars) ? 0 : macro?.sugars}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: "monospace" }}>
                Fiber : {isNaN(macro?.fiber) ? 0 : macro?.fiber}
              </Typography>
              <TextField
                id="standard-basic"
                label="Grams"
                variant="standard"
                type={"number"}
                onChange={(e) => handleGramsChange(e.target.value)}
                width="180px"
              />
              <Button
                variant="contained"
                size="large"
                onClick={handleAddFoodItem}
                width="182px"
              >
                Add
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
