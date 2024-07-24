import { Component } from '@angular/core';
import {BasePageComponent} from "../../itens/base-page/base-page.component";
import {SidebarComponent} from "../../itens/sidebar/sidebar.component";

@Component({
  selector: 'app-alimentos-page',
  standalone: true,
    imports: [
        BasePageComponent,
        SidebarComponent
    ],
  templateUrl: './alimentos-page.component.html',
  styleUrl: './alimentos-page.component.css'
})
export class AlimentosPageComponent {

}
