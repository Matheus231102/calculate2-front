import { Component } from '@angular/core';
import {BasePageComponent} from "../../itens/base-page/base-page.component";
import {SidebarComponent} from "../../itens/sidebar/sidebar.component";

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    BasePageComponent,
    SidebarComponent
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {

}
