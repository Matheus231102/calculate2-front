import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BasePageComponent} from "../../itens/base-page/base-page.component";
import {SidebarComponent} from "../../itens/sidebar/sidebar.component";
import {AlimentosService} from "../../../services/alimentos.service";
import {IFood} from "../../../interfaces/IFood";
import {NumberFormatUtils} from "../../../utils/numberFormatUtils";
import {FoodDTO} from "../../../interfaces/FoodDTO";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-alimentos-page',
  standalone: true,
  imports: [
    BasePageComponent,
    SidebarComponent,
    ReactiveFormsModule,
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

  private readonly averageValuesAccuracy: number = 2;

  constructor(private alimentosService: AlimentosService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setTableFormGroup()
    this.updateFoods()
  }

  updateFoods() {
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

  addFood() {
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

  removeFood(id: string) {
    this.alimentosService.removeFood(id)
      .subscribe(response => {
        this.updateFoods()
        this.tableFormGroup.reset();
      })
  }

  removeFoods(foodsId: Array<string>) {
    this.alimentosService.removeFoods(foodsId)
      .subscribe(response => {
        this.updateFoods()
        this.tableFormGroup.reset();
      })
  }

  removeSelectedFoods() {
    let selectedItens: Array<string> = [];

    Object.entries(this.tableFormGroup.value).forEach((element: Array<any>) => {
      if (element[1]) {
        selectedItens.push(element[0].substring(5))
      }
    })

    this.removeFoods(selectedItens);
    selectedItens = [];
  }

  updateAverageProperties(){
    this.calculateAverageCalories()
    this.calculateAverageProteins()
    this.calculateAverageCarbohydrates()
    this.calculateAverageFats()
    this.calculateAveragePrice()
  }

  calculateAverageCalories() {
    const totalCalories = this.foods.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.calories;
    }, 0)

    this.caloriesAverage = NumberFormatUtils.formatNumberToFixed(totalCalories / this.foods.length, this.averageValuesAccuracy)
  }

  calculateAverageProteins() {
    const totalProteins = this.foods.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.proteins;
    }, 0)

    this.proteinsAverage = NumberFormatUtils.formatNumberToFixed(totalProteins / this.foods.length, this.averageValuesAccuracy)
  }

  calculateAverageCarbohydrates() {
    const totalCarbohydrates = this.foods.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.carbohydrates;
    }, 0)

    this.carbohydratesAverage = NumberFormatUtils.formatNumberToFixed(totalCarbohydrates / this.foods.length, this.averageValuesAccuracy)
  }

  calculateAverageFats() {
    const totalFats = this.foods.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.fats;
    }, 0)

    this.fatsAverage = NumberFormatUtils.formatNumberToFixed(totalFats / this.foods.length, this.averageValuesAccuracy)
  }

  calculateAveragePrice() {
    const totalPrice = this.foods.reduce((previousValue, currentValue) => {

      return previousValue + currentValue.price;
    }, 0)

    this.priceAverage = NumberFormatUtils.formatNumberToFixed(totalPrice / this.foods.length, this.averageValuesAccuracy)
  }

  private updateDeleteSelectedButton() {
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

  private isAtLeastOneSelected(): boolean {
    let b = false;
    Object.values(this.tableFormGroup.value).forEach(value => {
      if (value == true) b = true;
    })
    return b;
  }

  private setTableChangeListener() {
    this.tableFormGroup.valueChanges.subscribe(change => {
      this.updateDeleteSelectedButton()
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
