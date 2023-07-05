import {LoginPage} from "../pages/LoginPage";
import {MainPage} from "../pages/MianPage";

export const appModule = () => [
  {
    name: "login",
    component: LoginPage,
  },{
    name: "main",
    component: MainPage,
  }
];
