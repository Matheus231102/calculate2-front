import {Component,OnInit} from '@angular/core';
import {BasePageComponent} from "../../itens/base-page/base-page.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RouterPagesService} from "../../../services/router-pages.service";
import {NgClass} from "@angular/common";
import {RegisterDTO} from "../../../interfaces/RegisterDTO";
import {RegisterService} from "../../../services/register.service";
import {HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "../../../services/local-storage.service";

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
    this.setRegisterFormGroup()
    this.setRegisterFormControls()
  }

  private setRegisterFormGroup() {
    this.mainForm = this.formBuilder.group({});
  }

  private setRegisterFormControls() {
    this.mainForm.addControl("nameInput", new FormControl( '', [Validators.required]))

    this.mainForm.addControl("usernameInput", new FormControl( '', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern(this.noSpaceValidatorPattern)]))

    this.mainForm.addControl("emailInput", new FormControl('', [
      Validators.required,
      Validators.email
    ]))

    this.mainForm.addControl("passwordInput", new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordValidatorPattern)]))

    this.mainForm.addControl("password2Input", new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordValidatorPattern)]))
  }

  registerUser() {
    let formValues: RegisterDTO = this.getRegisterFormValues();
    if (this.mainForm.valid && this.bothPasswordsTheSame && this.isCredentialsAvailable()) {
      this.registerService.registerUser(formValues)
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
      name: this.mainForm.controls["nameInput"].value,
      username: this.mainForm.controls["usernameInput"].value,
      email: this.mainForm.controls["emailInput"].value,
      password: this.mainForm.controls["passwordInput"].value
    }
  }

  private isCredentialsAvailable() {
    return this.isEmailAvailable && this.isUsernameAvailable;
  }

  /* EMAIL VALIDATIONS CONDITIONS */
  get emailInvalidTouched() {
    return this.mainForm.controls["emailInput"].invalid &&
           this.mainForm.controls["emailInput"].touched;
  }

  get emailValid() {
    return this.mainForm.controls["emailInput"].valid;
  }

  /* NAME AND USERNAME VALIDATIONS CONDITIONS */
  get nameValid() {
    return this.mainForm.controls["nameInput"].valid
  }

  get nameInvalidTouched() {
    return this.mainForm.controls["nameInput"].valid &&
      this.mainForm.controls["nameInput"].touched;
  }

  get usernameValid() {
    return this.mainForm.controls["usernameInput"].valid
  }

  get usernameInvalidTouched() {
    return this.mainForm.controls["usernameInput"].invalid &&
      this.mainForm.controls["usernameInput"].touched;
  }

  private setUsernameAvailableValue() {
    let username = this.mainForm.controls["usernameInput"].getRawValue()
    let isUsernameAvailable: boolean = false;
    this.registerService.isUsernameAvailable(username).subscribe({
      next: response => {
        isUsernameAvailable = <boolean>response.body
      }
    })
    this.isUsernameAvailable = isUsernameAvailable;
  }

  /* PASSWORD VALIDATIONS CONDITIONS */
  get passwordValid() {
    return this.mainForm.controls["passwordInput"].valid && this.mainForm.controls["password2Input"].valid
  }

  get passwordInvalidTouched() {
    let firstPasswordBooleanControl: boolean = this.mainForm.controls["passwordInput"].invalid &&
      this.mainForm.controls["passwordInput"].touched;

    let secondPasswordBooleanControl: boolean = this.mainForm.controls["password2Input"].invalid &&
      this.mainForm.controls["password2Input"].touched;

    return firstPasswordBooleanControl && secondPasswordBooleanControl
  }

  get bothPasswordsTheSame(): boolean {
    let password1 = this.mainForm.controls["passwordInput"].value
    let password2 = this.mainForm.controls["password2Input"].value
    return password1 === password2
  }

  get passwordHasLeastOneDigit(): boolean {
    const password = this.mainForm.controls["passwordInput"].value;
    return /\d/.test(password);
  }

  get passwordHasLeastOneLowerCase(): boolean {
    const password = this.mainForm.controls["passwordInput"].value;
    return /[a-z]/.test(password);
  }

  get passwordHasLeastOneUpperCase(): boolean {
    const password = this.mainForm.controls["passwordInput"].value;
    return /[A-Z]/.test(password);
  }

  get passwordHasMinLength(): boolean {
    const password = this.mainForm.controls["passwordInput"].value;
    return password.length >= 8;
  }

  get passwordHasOnlyAllowedSpecialChars(): boolean {
    const password = this.mainForm.controls["passwordInput"].value;
    return /^[a-zA-Z0-9$*&@#]*$/.test(password);
  }

}
