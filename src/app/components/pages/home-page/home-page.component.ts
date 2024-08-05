import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {LocalStorageService} from "../../../services/local-storage.service";
import {RouterPagesService} from "../../../services/router-pages.service";
import {BasePageComponent} from "../../itens/base-page/base-page.component";
import {NgClass} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {SidebarComponent} from "../../itens/sidebar/sidebar.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    BasePageComponent,
    NgClass,
    RouterOutlet,
    RouterLink,
    SidebarComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  public userToken: string = "no token";
  public username!: string;

  constructor(private authenticationService: LoginService,
              private routerPages: RouterPagesService,
              private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    const jwtToken = this.localStorageService.getUserToken()

    if (jwtToken == null) {
      this.routerPages.toLogin()
    }

    this.userToken = jwtToken!;
  }



}
