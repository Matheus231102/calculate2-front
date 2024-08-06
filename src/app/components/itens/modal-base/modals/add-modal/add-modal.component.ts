import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FoodDTO} from "../../../../../interfaces/FoodDTO";

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css'
})
export class AddModalComponent implements OnInit {
  @ViewChild("openButton") openButton!: ElementRef;
  @ViewChild("closeButton") closeButton!: ElementRef;
  @ViewChild("addButton") addButton!: ElementRef;

  @Output() addEvent: EventEmitter<FoodDTO> = new EventEmitter();

  mainForm!: FormGroup;

  constructor(private renderer: Renderer2,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.mainForm = this.formBuilder.group({
      floatName: new FormControl('', [Validators.required, Validators.minLength(1)]),
      floatCalories: new FormControl(0, [Validators.required, Validators.min(0)]),
      floatProteins: new FormControl(0, [Validators.required, Validators.min(0)]),
      floatCarbohydrates: new FormControl(0, [Validators.required, Validators.min(0)]),
      floatFats: new FormControl(0, [Validators.required, Validators.min(0)]),
      floatPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    })

    this.mainForm.valueChanges.subscribe(change => {
      if (this.mainForm.status === "VALID") {
        this.enableSubmitButton();
      } else if (this.mainForm.status === "INVALID") {
        this.disableSubmitButton();
      }
    })
  }

  private enableSubmitButton() {
    this.addButton.nativeElement.disabled = false
  }

  private disableSubmitButton() {
    this.addButton.nativeElement.disabled = true
  }

  open() {
    this.renderer.selectRootElement(this.openButton.nativeElement).click()
  }

  close() {
    this.renderer.selectRootElement(this.closeButton.nativeElement).click()
  }

  private getNameControl() {
    return this.mainForm.controls["floatName"]
  }

  private getCaloriesControl() {
    return this.mainForm.controls["floatCalories"]
  }

  private getProteinsControl() {
    return this.mainForm.controls["floatProteins"]
  }

  private getCarbohydratesControl() {
    return this.mainForm.controls["floatCarbohydrates"]
  }

  private getFatsControl() {
    return this.mainForm.controls["floatFats"]
  }

  private getPriceControl() {
    return this.mainForm.controls["floatPrice"]
  }

  cleanFields() {
    this.getNameControl().setValue('');
    this.getCaloriesControl().setValue(0);
    this.getProteinsControl().setValue(0);
    this.getCarbohydratesControl().setValue(0);
    this.getFatsControl().setValue(0);
    this.getPriceControl().setValue(0);
  }

  addFood() {
    let food: FoodDTO = {
      calories: this.getCaloriesControl().value,
      carbohydrates: this.getCarbohydratesControl().value,
      fats: this.getFatsControl().value,
      name: this.getNameControl().value,
      price: this.getPriceControl().value,
      proteins: this.getProteinsControl().value
    }
    this.addEvent.emit(food);
  }
}
