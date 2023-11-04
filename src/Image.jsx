import React from "react";

function Image({ imageName, height, width }) {

  const fileName = imageName.replace(/[-\s]/g, "");
  let img;
  try {
    if(fileName.includes('.')) {
      img = require(`./images/${fileName}`);
    } else {
   img = require(`./images/${fileName}.jpeg`);
    }
  }
  catch (err) {
    return (
      // create a default image
      <img src={require(`./images/Almonds.jpeg`)} height={height} width={width} alt="noimage" />
    );
  }
  return (
    <img src={img} height={height} width={width} alt="noimage" />
  );
}

export default Image;
