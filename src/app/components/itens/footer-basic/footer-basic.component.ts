import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-basic',
  standalone: true,
  imports: [],
  templateUrl: './footer-basic.component.html',
  styles: `
    .content-box {
      width: 100%;
      height: 3em;
    }

    .content {
      padding: 5px;
      width: 100%;
      height: 100%;
      background-color: var(--yinmn-blue);
      text-align: center;
      color: var(--basic-white);
      display: flex;
      flex-direction: row;
    }

    .content-text {
      font-weight: 600;
      font-size: 0.8em;
    }

  `
})
export class FooterBasicComponent {

}
