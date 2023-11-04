import { isUserOnBoarded } from "../utils/CurrentUserDetails";
 const Citems = [
    {
        id: 1,
        imageName: 'CarousalSetGoal.jpeg',
        Title: "Set your goal",
        Route: isUserOnBoarded() ? "/app/goals" : "/app/onboard"

    },
    {
        id: 2,
        imageName: 'CarouselRM.png',
        Title: "Make exciting and accurate recipes",
        Route: "app/explore"
    },
    {
        id: 3,
        imageName: 'CarouselExplore.jpeg',
        Title: "Explore our vide variety of food and their nutritions",
        Route: "app/explore"
    },
] 
export default Citems;
