import React from 'react'
import Carousel from 'react-material-ui-carousel'
import Item from './Items';
import Citems from '../../config/HomePageCarousalItems'


function CarouselHomePage() {
  // console.log(Citems);
  return (
    <Carousel interval={1500}  animation='slide' >
       {Citems.map((item) => <Item key={item.id} item={item} />)}
    </Carousel>
  )
}

export default CarouselHomePage;