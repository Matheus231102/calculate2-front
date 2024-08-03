import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {IFood} from "../interfaces/IFood";
import {Observable} from "rxjs";
import {LocalStorageService} from "./local-storage.service";
import {FoodDTO} from "../interfaces/FoodDTO";

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {
  private readonly urlBase: string = "http://localhost:8080"
  private readonly alimentosEndpoint : string = "/foods";

  private readonly alimentosHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${this.localStorageService.getUserToken()}`
  });

  constructor(private httpClient: HttpClient,
              private localStorageService: LocalStorageService) {}

  getAllFoods(): Observable<HttpResponse<IFood[]>> {
    return this.httpClient.get<IFood[]>(`${this.urlBase}${this.alimentosEndpoint}`, {
      headers: this.alimentosHeaders,
      observe: "response"
    })
  }

  addFood(foodDTO: FoodDTO) {
    return this.httpClient.post(`${this.urlBase}${this.alimentosEndpoint}`, foodDTO, {
      headers: this.alimentosHeaders,
    })
  }

  removeFood(id: string) {
    return this.httpClient.delete(`${this.urlBase}${this.alimentosEndpoint}/${id}`, {
      headers: this.alimentosHeaders
    })
  }

  removeFoods(foodsId: Array<string>) {
    return this.httpClient.post(`${this.urlBase}${this.alimentosEndpoint}/delete`, foodsId, {
      headers: this.alimentosHeaders
    })
  }

  updateFood(foodDTO: FoodDTO, id: string) {
    return this.httpClient.patch(`${this.urlBase}${this.alimentosEndpoint}/${id}`, foodDTO, {
      headers: this.alimentosHeaders,
    })
  }

}
