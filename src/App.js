import LoginPage from "../src/components/auth/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../src/components/dashboard/Dashboard";
import Recipes from "../src/components/recipes/Recipes";
import About from "../src/components/about/About";
import Contact from "../src/components/contact/Contact";
import { getCurrentUser } from "./utils/CurrentUserDetails";
import HomePage, { HomePageContents } from "./components/homePage/HomePage";
import ExploreFoodItems from "./components/explorePage/ExploreFoodItems";
import ProtectedRoutes from "./ProtectedRoutes";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/auth/ResetPasswordPage";
import SetGoalsPage from "./components/goals/SetGoalsPage";
import QuestionsCard from "./components/goals/QuestionsCard";
import ExploreNew from "./components/exploreNew/ExploreNew";
import SearchFoodComponent from "./components/recipes/SearchFoodComponent";

function App() {
  const isUserLoggedIn = getCurrentUser()?.isLoggedIn;
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/app" replace />} />
        <Route path="/app" element={<HomePage />}>
          <Route index element={<HomePageContents />} />
          {/* <Route
            element={
              <ProtectedRoutes isUserLoggedIn={isUserLoggedIn}>
                <Route path="explore" element={<ExploreFoodItems />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="recipes" element={<Recipes />} />
              </ProtectedRoutes>
            }
          /> */}
          <Route path="explore" element={<ExploreFoodItems />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes isUserLoggedIn={isUserLoggedIn}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="recipes"
            element={
              <ProtectedRoutes isUserLoggedIn={isUserLoggedIn}>
                <Recipes />
              </ProtectedRoutes>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="goals" element={<SetGoalsPage />} />
          <Route
            path="onboard"
            element={
              <ProtectedRoutes isUserLoggedIn={isUserLoggedIn}>
                <QuestionsCard />
              </ProtectedRoutes>
            }
          />
          <Route path="explorenew" element={<ExploreNew />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
      </Routes>
    </>
  );
}

export default App;
