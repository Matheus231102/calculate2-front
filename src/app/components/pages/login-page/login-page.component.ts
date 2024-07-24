import {Component, ElementRef, ViewChild} from '@angular/core';
import {BasePageComponent} from "../../itens/base-page/base-page.component";
import {AuthenticationService} from "../../../services/authentication.service";
import {LoginDTO} from "../../../interfaces/LoginDTO";
import {FormsModule} from "@angular/forms";
import {HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "../../../services/local-storage.service";
import {RouterPagesService} from "../../../services/router-pages.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    BasePageComponent,
    FormsModule,
    BasePageComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  @ViewChild("usernameInput") usernameInput!: ElementRef;
  @ViewChild("passwordInput") passwordInput!: ElementRef;

  constructor(private authenticationService: AuthenticationService,
              private localStorageService: LocalStorageService,
              private routerPages: RouterPagesService,
              private router: Router) {}

  loginUser() {
    const username = this.usernameInput.nativeElement.value
    const password = this.passwordInput.nativeElement.value

    const loginObject: LoginDTO = {
      login: username,
      password: password,
    }

    console.log(username)

    this.authenticationService.loginUser(loginObject)
      .subscribe((response: any) => {
        const headers: HttpHeaders = response.headers;
        const jwtToken = headers.get("Authorization");

        if (jwtToken != null) {
          this.localStorageService.setUserToken(jwtToken)
          this.routerPages.toHome()
        }

        //tratamento exceções
      });
  }

}

