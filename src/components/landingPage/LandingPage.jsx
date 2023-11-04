import React, { useEffect, useRef } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { getCurrentUser } from "../../utils/CurrentUserDetails";
import About from "../about/About";
import Contact from "../contact/Contact";
import Dashboard from "../dashboard/Dashboard";
import ExploreFoodItems from "../explorePage/ExploreFoodItems";
import NavBar from "../navbar/NavBar";
import Recipes from "../recipes/Recipes";
import "./LandingPage.css";

function LandingPage() {
  const currentUser = getCurrentUser();
  return (
    <div id="app">
      <NavBar />
    <ExploreFoodItems />
    </div>
  );
}

export default LandingPage;
