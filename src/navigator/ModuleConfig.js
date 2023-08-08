import {LoginPage} from "../pages/LoginPage";
import MainPage from "../pages/MianPage";
import SoundView from "../component/SoundView";

export const appModule = () => [
  {
    name: "SoundView",
    component: SoundView,
  },
  {
    name: "login",
    component: LoginPage,
  },{
    name: "main",
    component: MainPage,
  }
];
