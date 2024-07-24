import { Component } from '@angular/core';

@Component({
  selector: 'app-header-basic',
  standalone: true,
  imports: [],
  templateUrl: './header-basic.component.html',
  styles: `
    .content-box {
      width: 100%;
      height: 3em;
      }

    .content {
      width: 100%;
      height: 100%;
      background-color: var(--yinmn-blue);
      text-align: center;
      color: var(--basic-white);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .content-text {
      font-weight: 600;
      font-size: 1.5em;
    }

  `
})
export class HeaderBasicComponent {

}
