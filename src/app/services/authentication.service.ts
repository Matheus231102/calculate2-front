import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginDTO} from "../interfaces/LoginDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly urlBase: string = "http://localhost:8080"
  private readonly loginEndpoint : string = "/users/login";

  private readonly loginHeader: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private httpClient: HttpClient) {}

  loginUser(loginDTO: LoginDTO): Observable<any> {
    return this.httpClient.post<string>(`${this.urlBase}${this.loginEndpoint}`, loginDTO,
      {
        headers: this.loginHeader,
        observe: "response"
      });
  }
}
