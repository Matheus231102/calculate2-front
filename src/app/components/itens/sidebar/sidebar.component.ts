import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {RouterPagesService} from "../../../services/router-pages.service";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarActive: boolean = false;
  isSidebarContentVisible: boolean = false;

  constructor(private routerPages: RouterPagesService,
              private localStorageService: LocalStorageService) {}

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive
    this.isSidebarContentVisible = !this.isSidebarContentVisible
  }

  logout() {
    this.localStorageService.clearUserToken()
    this.routerPages.toLogin()
  }
}
