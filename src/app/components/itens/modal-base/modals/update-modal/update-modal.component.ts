import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {IFood} from "../../../../../interfaces/IFood";
import {FoodDTO} from "../../../../../interfaces/FoodDTO";

@Component({
  selector: 'app-update-modal',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './update-modal.component.html',
  styleUrl: './update-modal.component.css'
})
export class UpdateModalComponent {
  @ViewChild("openButton") openButton!: ElementRef;
  @ViewChild("closeButton") closeButton!: ElementRef;

  @ViewChild("floatName") floatName!: ElementRef;
  @ViewChild("floatCalories") floatCalories!: ElementRef;
  @ViewChild("floatProteins") floatProteins!: ElementRef;
  @ViewChild("floatCarbohydrates") floatCarbohydrates!: ElementRef;
  @ViewChild("floatFats") floatFats!: ElementRef;
  @ViewChild("floatPrice") floatPrice!: ElementRef;

  @Output() updateEvent: EventEmitter<FoodDTO> = new EventEmitter();

  constructor(private renderer: Renderer2) {}

  open() {
    this.renderer.selectRootElement(this.openButton.nativeElement).click()
  }

  close() {
    this.renderer.selectRootElement(this.closeButton.nativeElement).click()
  }

  private getNameValue() {
    return this.floatName.nativeElement.value
  }

  private getCaloriesValue() {
    return this.floatCalories.nativeElement.value
  }

  private getProteinsValue() {
    return this.floatProteins.nativeElement.value
  }

  private getCarbohydratesValue() {
    return this.floatCarbohydrates.nativeElement.value
  }

  private getFatsValue() {
    return this.floatFats.nativeElement.value
  }

  private getPriceValue() {
    return this.floatPrice.nativeElement.value
  }

  cleanFields() {
    this.renderer.setProperty(this.floatName.nativeElement, 'value', '');
    this.renderer.setProperty(this.floatCalories.nativeElement, 'value', 0);
    this.renderer.setProperty(this.floatProteins.nativeElement, 'value', 0);
    this.renderer.setProperty(this.floatCarbohydrates.nativeElement, 'value', 0);
    this.renderer.setProperty(this.floatFats.nativeElement, 'value', 0);
    this.renderer.setProperty(this.floatPrice.nativeElement, 'value', 0);
  }

  changeFields(food: IFood) {
    this.renderer.setProperty(this.floatName.nativeElement, 'value', food.name);
    this.renderer.setProperty(this.floatCalories.nativeElement, 'value', food.calories);
    this.renderer.setProperty(this.floatProteins.nativeElement, 'value', food.proteins);
    this.renderer.setProperty(this.floatCarbohydrates.nativeElement, 'value', food.carbohydrates);
    this.renderer.setProperty(this.floatFats.nativeElement, 'value', food.fats);
    this.renderer.setProperty(this.floatPrice.nativeElement, 'value', food.price);
  }

  updateFood() {
    let changedFood: FoodDTO = {
      calories: this.getCaloriesValue(),
      carbohydrates: this.getCarbohydratesValue(),
      fats: this.getFatsValue(),
      name: this.getNameValue(),
      price: this.getPriceValue(),
      proteins: this.getProteinsValue()
    }
    this.updateEvent.emit(changedFood);
  }

}
