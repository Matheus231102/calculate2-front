import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BasePageComponent} from "../../itens/base-page/base-page.component";
import {SidebarComponent} from "../../itens/sidebar/sidebar.component";
import {AlimentosService} from "../../../services/alimentos.service";
import {IFood} from "../../../interfaces/IFood";
import {NumberFormatUtils} from "../../../utils/numberFormatUtils";
import {FoodDTO} from "../../../interfaces/FoodDTO";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ModalBaseComponent} from "../../itens/modal-base/modal-base.component";
import {UpdateModalComponent} from "../../itens/modal-base/modals/update-modal/update-modal.component";

@Component({
  selector: 'app-alimentos-page',
  standalone: true,
  imports: [
    BasePageComponent,
    SidebarComponent,
    ReactiveFormsModule,
    ModalBaseComponent,
    UpdateModalComponent,
  ],
  templateUrl: './alimentos-page.component.html',
  styleUrl: './alimentos-page.component.css'
})
export class AlimentosPageComponent implements OnInit {
  foods: IFood[] = new Array<IFood>()

  tableFormGroup!: FormGroup;

  caloriesAverage: number = 0;
  proteinsAverage: number = 0;
  carbohydratesAverage: number = 0;
  fatsAverage: number = 0;
  priceAverage: number = 0;

  @ViewChild("floatName") floatName!: ElementRef;
  @ViewChild("floatCalories") floatCalories!: ElementRef;
  @ViewChild("floatProteins") floatProteins!: ElementRef;
  @ViewChild("floatCarbohydrates") floatCarbohydrates!: ElementRef;
  @ViewChild("floatFats") floatFats!: ElementRef;
  @ViewChild("floatPrice") floatPrice!: ElementRef;

  @ViewChild("removeSelectedButton") removeSelectedButton!: ElementRef;
  @ViewChild("updateSelectedButton") updateSelectedButton!: ElementRef;

  @ViewChild(UpdateModalComponent) updateModalComponent!: UpdateModalComponent;

  private readonly averageValuesAccuracy: number = 2;
  private selectedItem!: IFood;

  constructor(private alimentosService: AlimentosService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setTableFormGroup()
    this.updateFoods()
  }

  /* SELECTED FOOD */
  private changeSelectedFood() {
    let item = this.foods.filter(food => {
      return food.id.toString() === this.getSelectedItemId();
    })
    this.selectedItem = item[0];
  }

  /* CRUD OPERATIONS */
  private updateFoods() {
    this.alimentosService.getAllFoods()
      .subscribe(response => {
        if (response.body) {
          this.foods = response.body

          this.setTableFormControls()
          this.setTableChangeListener()
        }
        this.updateAverageProperties()
      })
  }

  public addFood() {
    const floatName = this.floatName.nativeElement.value
    const floatCalories = this.floatCalories.nativeElement.value
    const floatProteins = this.floatProteins.nativeElement.value
    const floatCarbohydrates = this.floatCarbohydrates.nativeElement.value
    const floatFats = this.floatFats.nativeElement.value
    const floatPrice = this.floatPrice.nativeElement.value

    const foodDTO: FoodDTO = {
      name: floatName,
      calories: floatCalories,
      proteins: floatProteins,
      carbohydrates: floatCarbohydrates,
      fats: floatFats,
      price: floatPrice,
    }

    this.alimentosService.addFood(foodDTO)
      .subscribe(response => {
        this.updateFoods()
      })
  }

  private removeFoods(foodsId: Array<string>) {
    this.alimentosService.removeFoods(foodsId)
      .subscribe(response => {
        this.updateFoods()
        this.tableFormGroup.reset();
      })
  }

  public removeSelectedFoods() {
    let selectedItens: Array<string> = [];

    Object.entries(this.tableFormGroup.value).forEach((element: Array<any>) => {
      if (element[1]) {
        selectedItens.push(element[0].substring(5))
      }
    })

    this.removeFoods(selectedItens);
    selectedItens = [];
  }

  public updateSelectedFood(foodDTO: FoodDTO) {
    this.updateModalComponent.close()
    this.alimentosService.updateFood(foodDTO, this.getSelectedItemId())
      .subscribe(response => {
        this.updateFoods()
      })
  }

  /* UPDATE MODAL */
  public openUpdateModal() {
    this.changeSelectedFood();
    this.updateModalComponent.changeFields(this.selectedItem);
    this.updateModalComponent.open()
  }

  /* UPDATE PROPERTIES FUNCTION */
  private updateAverageProperties(){
    this.calculateAverageCalories()
    this.calculateAverageProteins()
    this.calculateAverageCarbohydrates()
    this.calculateAverageFats()
    this.calculateAveragePrice()
  }

  private calculateAverageCalories() {
    const totalCalories = this.foods.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.calories;
    }, 0)

    this.caloriesAverage = NumberFormatUtils.formatNumberToFixed(totalCalories / this.foods.length, this.averageValuesAccuracy)
  }

  private calculateAverageProteins() {
    const totalProteins = this.foods.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.proteins;
    }, 0)

    this.proteinsAverage = NumberFormatUtils.formatNumberToFixed(totalProteins / this.foods.length, this.averageValuesAccuracy)
  }

  private calculateAverageCarbohydrates() {
    const totalCarbohydrates = this.foods.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.carbohydrates;
    }, 0)

    this.carbohydratesAverage = NumberFormatUtils.formatNumberToFixed(totalCarbohydrates / this.foods.length, this.averageValuesAccuracy)
  }

  private calculateAverageFats() {
    const totalFats = this.foods.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.fats;
    }, 0)

    this.fatsAverage = NumberFormatUtils.formatNumberToFixed(totalFats / this.foods.length, this.averageValuesAccuracy)
  }

  private calculateAveragePrice() {
    const totalPrice = this.foods.reduce((previousValue, currentValue) => {

      return previousValue + currentValue.price;
    }, 0)

    this.priceAverage = NumberFormatUtils.formatNumberToFixed(totalPrice / this.foods.length, this.averageValuesAccuracy)
  }

  /* UPDATE SELECTED BUTTON */
  private changeUpdateSelectedButton() {
    if (this.isJustOneSelected()) {
      this.enableUpdateSelectedButton()
      return
    }
    this.disableUpdateSelectedButton()
  }

  private disableUpdateSelectedButton() {
    this.updateSelectedButton.nativeElement.disabled = true;
  }

  private enableUpdateSelectedButton() {
    this.updateSelectedButton.nativeElement.disabled = false;
  }

  /* REMOVE SELECTED BUTTON */
  private changeDeleteSelectedButton() {
    if (this.isAtLeastOneSelected()) {
      this.enableDeleteSelectedButton()
      return
    }
    this.disableDeleteSelectedButton()
  }

  private disableDeleteSelectedButton() {
    this.removeSelectedButton.nativeElement.disabled = true;
  }

  private enableDeleteSelectedButton() {
    this.removeSelectedButton.nativeElement.disabled = false;
  }

  /* TABLE */
  private getSelectedItemId() {
    if (this.isJustOneSelected()) {
      let selectedId = Object.entries(this.tableFormGroup.value)
        .filter(value => {
          return value[1] === true;
        })
        .map(value => {
          return value[0].substring(5)
        })
        .join("")
      return selectedId
    } else {
      return "0";
    }
  }

  private isAtLeastOneSelected(): boolean {
    let b = false;
    Object.values(this.tableFormGroup.value).forEach(value => {
      if (value == true) b = true;
    })
    return b;
  }

  private isJustOneSelected() {
    let trueCounting = 0;
    let falseCounting = 0;

    Object.values(this.tableFormGroup.value).forEach(value => {
      value == true ? trueCounting++ : falseCounting++;
    })
    return trueCounting == 1
  }

  private setTableChangeListener() {
    this.tableFormGroup.valueChanges.subscribe(change => {
      this.changeDeleteSelectedButton()
      this.changeUpdateSelectedButton()
      this.getSelectedItemId();
    })
  }

  private setTableFormGroup() {
    this.tableFormGroup = this.formBuilder.group({})
  }

  private setTableFormControls() {
    this.foods.forEach(food => {
      this.tableFormGroup.addControl(`food-${food.id}`, new FormControl(false))
    })
  }

}
