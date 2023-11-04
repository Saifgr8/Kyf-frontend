
import React, { useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import styles from './styles.module.css';
import { Button } from '@mui/material';

const Page = ({ offset, gradient, onClick, label, desc, explore, href }) => (
  <>
    <ParallaxLayer offset={offset} speed={0.2} onClick={onClick} className={`image${offset + 1}`}>
      <div className={styles.slopeBegin}>
      </div>
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
      <div className={`${styles.slopeEnd} ${styles[gradient]}`} />
    </ParallaxLayer>

    <ParallaxLayer className={`${styles.text} ${styles.number}`} offset={offset} speed={0.3}>
      <span>{label}</span>
    </ParallaxLayer>
    <ParallaxLayer className={`${styles.text} ${styles.number2}`} offset={offset} speed={0.3}>
      <span>{desc}</span>
    </ParallaxLayer>
    <ParallaxLayer className={`${styles.text} ${styles.number3}`} offset={offset} speed={0.3}>
      <span><Button sx={{ pointerEvents: 'auto' }} href={href} size="large" variant='contained'>{explore}</Button></span>
    </ParallaxLayer>
  </>
);

export default function ExploreNew() {
  const parallax = useRef(null);

  const scroll = (to) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
    }
  };

  return (
    <div style={{ background: '#dfdfdf' }} className='TopDiv'>
      <Parallax className={styles.container} ref={parallax} pages={3} horizontal>
        <Page offset={0} href="explore" explore="Explore Veg" label="veg" desc="A vegetarian diet, rich in fruits & vegetables.A vegetarian diet, rich in fruits & vegetables" gradient="pink" onClick={() => scroll(1)} />
        <Page offset={1} href="explore" explore="Explore Non-Veg" label="Non-Veg" desc="Non-Veg diet, full of various nutritious meatsA vegetarian diet, rich in fruits & vegetables" gradient="teal" onClick={() => scroll(2)} />
        <Page offset={2} href="explore" explore="Explore Others" label="others" desc="Spices, nuts and other cooking ingredients. A vegetarian diet, rich in fruits & vegetables" gradient="tomato" onClick={() => scroll(0)} />
      </Parallax>
    </div>
  );
}
