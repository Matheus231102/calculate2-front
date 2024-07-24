import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isSidebarActive: boolean = false;
  isSidebarContentVisible: boolean = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive
    this.isSidebarContentVisible = !this.isSidebarContentVisible
  }
}
