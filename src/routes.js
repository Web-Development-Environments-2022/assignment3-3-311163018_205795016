import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/Favorites",
    name: "Favorites",
    component: () => import("./pages/FavoritesPage"),
  },
  {
    path: "/Private",
    name: "Private",
    component: () => import("./pages/PrivatePage"),
  },
  {
    path: "/Family",
    name: "Family",
    component: () => import("./pages/FamilyPage"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("./pages/CreatePage"),
  }, 
  {
   path: "/about",
   name: "About", 
   component: () => import("./pages/AboutPage"),
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
