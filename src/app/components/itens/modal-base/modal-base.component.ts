import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-modal-base',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './modal-base.component.html',
  styleUrl: './modal-base.component.css'
})
export class ModalBaseComponent {

  @ViewChild("openButton") openButton!: ElementRef;
  @ViewChild("closeButton") closeButton!: ElementRef;

  constructor(private renderer: Renderer2) {}

  open() {
    this.renderer.selectRootElement(this.openButton.nativeElement).click()
  }

  close() {
    this.renderer.selectRootElement(this.closeButton.nativeElement).click()
  }

}
