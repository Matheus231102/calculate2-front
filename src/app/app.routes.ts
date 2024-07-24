import { Routes } from '@angular/router';
import {LoginPageComponent} from "./components/pages/login-page/login-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {RefeicoesPageComponent} from "./components/pages/refeicoes-page/refeicoes-page.component";

export const routes: Routes = [
  { path: "", component: LoginPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "home", component: HomePageComponent },
  { path: "refeicoes", component: RefeicoesPageComponent },
];
