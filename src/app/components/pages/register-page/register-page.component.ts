import {Component, OnInit} from '@angular/core';
import {BasePageComponent} from "../../itens/base-page/base-page.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterPagesService} from "../../../services/router-pages.service";
import {NgClass} from "@angular/common";
import {RegisterDTO} from "../../../interfaces/RegisterDTO";
import {RegisterService} from "../../../services/register.service";
import {HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "../../../services/local-storage.service";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    BasePageComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {
  protected readonly emailControlName: string = "emailInput"
  protected readonly nameControlName: string = "nameInput"
  protected readonly usernameControlName: string = "usernameInput"
  protected readonly passwordControlName: string = "passwordInput"
  protected readonly password2ControlName: string = "password2Input"

  public mainForm!: FormGroup;

  protected isEmailAvailable: boolean = false;
  protected isUsernameAvailable: boolean = false;

  private passwordValidatorPattern: string = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}";
  private noSpaceValidatorPattern: string = "^[^\\s]+$"

  constructor(protected routerPages: RouterPagesService,
              protected registerService: RegisterService,
              protected localStorageService: LocalStorageService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setRegisterFormGroup();
    this.setRegisterFormControls();
    this.setEmailAvailabilityListener();
  }

  private setRegisterFormGroup() {
    this.mainForm = this.formBuilder.group({});
  }

  private setRegisterFormControls() {
    this.mainForm.addControl(this.nameControlName, new FormControl( '', [
      Validators.required,
      Validators.minLength(2)]))

    this.mainForm.addControl(this.usernameControlName, new FormControl( '', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(this.noSpaceValidatorPattern)]))

    this.mainForm.addControl(this.emailControlName, new FormControl('', [
      Validators.required,
      Validators.email
    ]))

    this.mainForm.addControl(this.passwordControlName, new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordValidatorPattern)]))

    this.mainForm.addControl(this.password2ControlName, new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordValidatorPattern)]))
  }

  registerUser() {
    let registerDTO: RegisterDTO = this.getRegisterFormValues();
    if (this.isTheMainFormValid && this.bothPasswordsTheSame) {
      this.registerService.registerUser(registerDTO)
        .subscribe(response => {
          const headers: HttpHeaders = response.headers;
          const jwtToken = headers.get("Authorization");

          if (jwtToken != null) {
            this.localStorageService.clearUserToken()
            this.localStorageService.setUserToken(jwtToken)
            this.routerPages.toHome()
          }
        })
    }
  }

  private getRegisterFormValues() {
    return {
      name: this.getNameControl.value,
      username: this.getUsernameControl.value,
      email: this.getEmailControl.value,
      password: this.getPasswordControl.value
    }
  }

  private setEmailAvailabilityListener() {
    this.getEmailControl.valueChanges
      .pipe(
        debounceTime(350))
      .subscribe({
        next: () => {
          if (this.isEmailValid) {
            this.checkEmailAvailability()
          }
        },
      })
  }

  private checkEmailAvailability() {
    let email = this.getEmailControl.value
    this.registerService.isEmailAvailable(email).subscribe({
      next: (response) => {
        this.isEmailAvailable = <boolean>response.body;
      }
    })
  }

  get isTheMainFormValid() {
    return this.mainForm.valid
  }

  /* EMAIL VALIDATIONS CONDITIONS*/
  get isEmailValid() {
    return this.getEmailControl.status == "VALID"
  }

  get isEmailTouched() {
    return this.getEmailControl.touched
  }

  /* NAME AND USERNAME VALIDATIONS CONDITIONS */
  get nameValid() {
    return this.getNameControl.valid
  }

  get nameInvalidTouched() {
    return !this.getNameControl.valid && this.getNameControl.touched;
  }

  get usernameValid() {
    return this.getUsernameControl.valid
  }

  get usernameInvalidTouched() {
    return this.getUsernameControl.invalid && this.getUsernameControl.touched;
  }

  /* PASSWORD VALIDATIONS CONDITIONS */
  get passwordValid() {
    return this.getPasswordControl.valid && this.getPassword2Control.valid
  }

  get passwordInvalidTouched() {
    let firstPasswordBooleanControl: boolean = this.getPasswordControl.invalid &&
      this.getPasswordControl.touched;

    let secondPasswordBooleanControl: boolean = this.getPassword2Control.invalid &&
      this.getPassword2Control.touched;

    return firstPasswordBooleanControl && secondPasswordBooleanControl
  }

  get bothPasswordsTheSame(): boolean {
    let password1 = this.getPasswordControl.value
    let password2 = this.getPassword2Control.value
    return password1 === password2
  }

  get passwordHasLeastOneDigit(): boolean {
    const password = this.getPasswordControl.value;
    return /\d/.test(password);
  }

  get passwordHasLeastOneLowerCase(): boolean {
    const password = this.getPasswordControl.value;
    return /[a-z]/.test(password);
  }

  get passwordHasLeastOneUpperCase(): boolean {
    const password = this.getPasswordControl.value;
    return /[A-Z]/.test(password);
  }

  get passwordHasMinLength(): boolean {
    const password = this.getPasswordControl.value;
    return password.length >= 8;
  }

  get passwordHasOnlyAllowedSpecialChars(): boolean {
    const password = this.getPasswordControl.value;
    return /^[a-zA-Z0-9$*&@#]*$/.test(password);
  }

  /* GET CONTROLS */
  get getEmailControl() {
    return this.mainForm.controls[this.emailControlName]
  }

  get getNameControl() {
    return this.mainForm.controls[this.nameControlName]
  }

  get getUsernameControl() {
    return this.mainForm.controls[this.usernameControlName]
  }

  get getPasswordControl() {
    return this.mainForm.controls[this.passwordControlName]
  }

  get getPassword2Control() {
    return this.mainForm.controls[this.password2ControlName]
  }

}
