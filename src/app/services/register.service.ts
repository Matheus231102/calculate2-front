import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterDTO} from "../interfaces/RegisterDTO";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly urlBase: string = "http://localhost:8080"
  private readonly registerEndpoint : string = "/users/register";

  private readonly registerHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private httpClient: HttpClient) {}

  registerUser(registerDTO: RegisterDTO): Observable<any> {
    return this.httpClient.post(`${this.urlBase}${this.registerEndpoint}`, registerDTO,
      {
        headers: this.registerHeader,
        observe: "response"
      });
  }

}
