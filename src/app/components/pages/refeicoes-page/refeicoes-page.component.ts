import { Component } from '@angular/core';
import {BasePageComponent} from "../../itens/base-page/base-page.component";
import {SidebarComponent} from "../../itens/sidebar/sidebar.component";

@Component({
  selector: 'app-refeicoes-page',
  standalone: true,
  imports: [
    BasePageComponent,
    SidebarComponent
  ],
  templateUrl: './refeicoes-page.component.html',
  styleUrl: './refeicoes-page.component.css'
})
export class RefeicoesPageComponent {

}
