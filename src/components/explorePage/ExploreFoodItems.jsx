import { Box } from '@mui/material'
import React from 'react'
import SearchFoodComponent from '../recipes/SearchFoodComponent'
import Lottie from 'lottie-react';
import carrot from '../../Videos/CarrotEplore.json';
import Baigan from '../../Videos/AubregeneExplore.json'

function ExploreFoodItems() {
  return (
    <Box sx={{
      display: "flex",
      width:"100%",
      backgroundColor:"lightyellow"
    }}>
      <Box sx={{
        width: "30%",
        height: "98vh",
      }}><Lottie animationData={carrot} style={{height: '100%'}}/></Box>
      <SearchFoodComponent  />
      <Box sx={{
        width: "30%",
        height: "98vh",
      }}><Lottie animationData={Baigan} style={{height: '100%'}}/></Box>
    </Box>
  )
}

export default ExploreFoodItems