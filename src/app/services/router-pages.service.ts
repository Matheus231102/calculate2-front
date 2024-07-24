import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouterPagesService {

  constructor(private router: Router) {}

  toLogin() {
    this.router.navigate(["/login"])
  }

  toRegister() {
    this.router.navigate(["/register"])
  }

  toHome() {
    this.router.navigate(["/home"])
  }

  toRefeicoes() {
    this.router.navigate(["/refeicoes"])
  }
}
