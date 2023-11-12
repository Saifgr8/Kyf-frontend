import React, { useRef } from "react";
import Lottie from "lottie-react";
import { ParallaxLayer, Parallax, IParallax } from "@react-spring/parallax";
import FruitFall from "../../Videos/Fall.json";
import AboutUs from "../../Videos/AboutUs.json";
import OurMission from "../../Videos/AboutMission.json";
import ourServices from "../../Videos/AboutServices.json";
import { Box, Typography } from "@mui/material";
import Footer from "../footer/Footer";
import "./About.css";
import image from '../../images/ExploreFullimgExploreVeg.jpeg';

function About() {
  const ref = useRef(null);

  return (
    <>
      <div>
        <Parallax pages={4} ref={ref}>
          <ParallaxLayer offset={0} speed={0.5} factor={1} className="AboutusDiv" onClick={() => ref.current.scrollTo(1)}>
            <Box sx= {{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'top',
            }}>
              <div style={{padding: '100px 0px 10px 50px', width: "45%"}}>
                <Typography variant="h3">
                  Welcome to KYF (Know Your Food)!
                </Typography>
                <br />
                <br />
                <br />
                <Typography variant="h5">
                  KYF isn't just an app; it's a manifestation of our unwavering
                  commitment to helping you lead a healthier, happier life. Our
                  journey began with a simple realization: the choices you make
                  about the food you eat have a profound impact on your
                  well-being. This revelation ignited our passion to develop an
                  app that empowers you to take control of your diet, make
                  informed decisions, and reach your health and fitness goals.
                </Typography>
              </div>
              <Box sx= {{
                width: '55%',
              }}>
                <Lottie animationData={AboutUs} />
              </Box>
            </Box>
          </ParallaxLayer>
          <ParallaxLayer
            offset={0.9}
            speed={0.5}
            factor={1}
            className="MissionDiv"
          >
            <Box sx= {{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'top',
            }}>
              <div style={{ width: "40%"}}>
                <Lottie animationData={OurMission} />
              </div>
              <div style={{padding: '100px 50px 10px 10px', width: "60%"}}>
                <Typography sx={{marginTop: '30px'}} variant="h3">Our Mission:</Typography>
                <br />
                <br />
                <Typography variant="h5">
                  Our focus is providing real support to users living
                  carb-conscious lifestyles focused on healthy, delicious, whole
                  foods. We supply you with chef-created recipes, meal plans,
                  educational content from health experts, and an engaging
                  community so you can keep it simple, while enjoying your life!
                </Typography>
              </div>
              
            </Box>
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.3}
            speed={0.5}
            factor={1}
            className="ServicesDiv"
          >
            <Box sx= {{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'top',
            }}>
             <div style={{padding: '100px 50px 10px 100px', width: "60%"}}>
                <Typography sx={{marginTop: '30px'}} variant="h3">Our Services:</Typography>
                <br />
                <br />
                <Typography variant="h5">
                  We're passionate about promoting sustainable nutrition and
                  fitness while keeping it exciting and delicious.Since our
                  start in 2010, we have expanded to be one of the top macro
                  tracking apps, with 15M downloads and a growing community of
                  users taking interest and responsibility for their health.
                </Typography>
              </div>
               <div style={{ width: "40%"}}>
                <Lottie animationData={ourServices} />
              </div>
            </Box>
          </ParallaxLayer>
          <ParallaxLayer offset={2} factor={3} speed={0.5} 
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
          </ParallaxLayer>

          <ParallaxLayer sticky={{ start: 2, end: 5 }}  onClick={() => ref.current.scrollTo(5)}>
            <Lottie animationData={FruitFall} style={{ height: "400px" }} />
          </ParallaxLayer>
           <ParallaxLayer sticky={{start: 4, end: 5}} style={{height: "40%"}}>
            <Footer />
          </ParallaxLayer>
        </Parallax>
      </div>
    </>
  );
}

export default About;
