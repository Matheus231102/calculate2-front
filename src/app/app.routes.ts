import { Routes } from '@angular/router';
import {LoginPageComponent} from "./components/pages/login-page/login-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {RefeicoesPageComponent} from "./components/pages/refeicoes-page/refeicoes-page.component";
import {AlimentosPageComponent} from "./components/pages/alimentos-page/alimentos-page.component";
import {authenticationGuard} from "./guards/authentication.guard";

export const routes: Routes = [
  { path: "", component: LoginPageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "home", component: HomePageComponent, canActivate: [authenticationGuard] },
  { path: "alimentos", component: AlimentosPageComponent, canActivate: [authenticationGuard]},
  { path: "refeicoes", component: RefeicoesPageComponent, canActivate: [authenticationGuard]},
];
