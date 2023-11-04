import React, { useRef, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import './MediaCard.css';
import Image from '../../Image';

export default function MediaCard({ foodItem, img, setSelectedItem }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = cardRef.current;
      const cardRect = card.getBoundingClientRect();
      const centerX = cardRect.left + cardRect.width / 2;
      const centerY = cardRect.top + cardRect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const offsetX = (mouseX - centerX) / 8;
      const offsetY = (mouseY - centerY) / 8;

      card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    const handleMouseLeave = () => {
      const card = cardRef.current;
      card.style.transform = 'none';
    };

    const card = cardRef.current;
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Card
      ref={cardRef}
      className="threeDHover"
      onClick={() => setSelectedItem(foodItem)}
      sx={{
        width: "220px",
        height: "230px",
        boxShadow: 2,
        transition: "box-shadow 0.3s",
        "&:hover": {
          cursor: "pointer",
          boxShadow: "8px 8px 8px 12px #A0BFE0",
          borderRadius: "25px",
        },
      }}
    >
      {/* <img src={TurkeyGround} alt='NO img' height={200} width={200}></img> */}
      {/* <CardMedia sx={{ height: 180 }} image={TurkeyGround} title={foodItem?.name} /> */}
      <Image imageName={foodItem?.name} height={150} width={220} />
      <CardContent>
        <Typography gutterBottom variant="body2" component="div" sx={{ fontFamily: "monospace" }}>
          {foodItem?.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
