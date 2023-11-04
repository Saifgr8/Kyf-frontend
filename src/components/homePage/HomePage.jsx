import { Box } from "@mui/system";
import * as React from "react";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import "./HomePageCss.css";
import Lottie from "lottie-react";
import { ButtonFooter } from "../footer/Footer";
import { Typography } from "@mui/material";
import Plane from "../../Videos/planeExplore.json";
import Journey from "../../Videos/JourneyExplore.json";
import RMgif from "../../Videos/RMgif.json";
import ExploreCircle from "../../Videos/HPexplore.json";
import Image from "../../Image";
import CookWomen from "../../Videos/CookWomen.json";
import FooterGIF from "../../Videos/FooterGIF.json";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from "react-scroll-motion";
import { isUserOnBoarded } from "../../utils/CurrentUserDetails";
import RobotGif from "../../Videos/RobotHomePage.json";
import CarouselHP from "./CarouselHomePage";

export default function HomePage() {
  return (
    <div className="HomePageCss">
      <NavBar />
      <Outlet />
    </div>
  );
}

const BrandingTop = () => {
  return (
    <div className="BraningtopCss">
      <h3 style={{ color: "black" }}>
        Your first step towards a healthy future 😀
      </h3>
    </div>
  );
};

export function HomePageContents() {
  return (
    <div className="HomeTopDiv">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "1500px",
        }}
      >
        <Lottie animationData={FooterGIF} style={{ marginTop: "-150px" }} />
        <div className="AnimationDiv">
          <ScrollContainer>
            <ScrollPage className="ScrollAnimation">
              <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
                <Typography
                  color={"black"}
                  className="TextOverlay"
                  sx={{ marginTop: "-200px" }}
                  fontSize="5rem"
                >
                  Know Your Food
                </Typography>
                <Typography sx={{ textAlign: "center" }} varient="body1">
                  Because knwoing your food is better than knowing most people.
                </Typography>
              </Animator>
              <Animator
                animation={batch(StickyIn(), FadeIn(), ZoomIn(), Fade())}
              >
                <BrandingTop />
              </Animator>
            </ScrollPage>

            <Lottie className="PlaneGif" animationData={Plane} />

            <ScrollPage>
              <Animator animation={batch(Fade(), Move(), Sticky())}>
                <Typography variant="body1">
                  Set your journey with our carefully tailored algorithm to
                  reach your goal.
                </Typography>
              </Animator>
            </ScrollPage>
            <div className="SetGoalDivTop">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ paddingRight: "20px" }}>
                  <Image imageName="SetGoalQs" height="300px" />
                  <Typography sx={{ padding: 3 }} variant="body1">
                    Answer a set of carefully curiated questions to help us
                    understand you for setting a goal
                  </Typography>
                  <Image imageName="SetGoalCards" height="300px" />
                  <Typography sx={{ padding: 3 }} variant="body1">
                    Choose among carefully calculated three possible goals which
                    suits you best
                  </Typography>
                </div>
                <div className="ExploreJrnyDiv">
                  <Lottie animationData={Journey} />
                  <div className="SetGoalButtonJourney">
                    <Typography variant="h3" color={"black"}>
                      Let's
                    </Typography>
                    <a
                      href={isUserOnBoarded() ? "/app/goals" : "/app/onboard"}
                      style={{ marginTop: "5px" }}
                    >
                      <ButtonFooter className="GoalsButton" name="Begin" />
                    </a>
                    <Typography variant="h3" color={"black"}>
                      our Journey! Shall we?
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="RMdivTop"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div style={{ paddingTop: "200px" }}>
                <a href="/app/recipes">
                  <ButtonFooter className="GoalsButton" name="Try" />
                </a>{" "}
                <Typography variant="h5" color="black">
                  Our world class and most accurate Recipe Maker
                </Typography>
                <Typography variant="h6" color="black">
                  With over 1000s of ingredients
                </Typography>
              </div>
              <Lottie animationData={CookWomen} style={{ height: "500px" }} />
            </div>
          </ScrollContainer>
        </div>
        <div className="ExploreDivTop">
          <Lottie
            style={{ height: "700px" }}
            className="ExploreEye"
            animationData={ExploreCircle}
          />
          <div className="StepsGifContainer" style={{ paddingTop: "200px" }}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Lets begin the exploration!
            </Typography>
            <div className="GoalsButton">
              <a href="/app/explorenew">
                <ButtonFooter name="Explore" />
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </Box>
    </div>
  );
}
