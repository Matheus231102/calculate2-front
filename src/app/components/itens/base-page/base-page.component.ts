import { Component } from '@angular/core';
import {HeaderBasicComponent} from "../header-basic/header-basic.component";
import {FooterBasicComponent} from "../footer-basic/footer-basic.component";

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [
    HeaderBasicComponent,
    FooterBasicComponent
  ],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.css'
})
export class BasePageComponent {

}
