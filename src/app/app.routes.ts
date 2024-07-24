import { Routes } from '@angular/router';
import {LoginPageComponent} from "./components/pages/login-page/login-page.component";
import {HomePageComponent} from "./components/pages/home-page/home-page.component";
import {TestingComponent} from "./components/pages/testing/testing.component";

export const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "home", component: HomePageComponent },
  { path: "login", component: LoginPageComponent },
  { path: "test", component: TestingComponent },
];
