import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public static userJwtTokenField: string = "calculate-macro-jwt";
  private readonly storage: Storage;
  private tokenBehaviorSubject: BehaviorSubject<string | null>;

  constructor() {
    this.storage = window.localStorage;
    const initialToken = this.getUserToken();
    this.tokenBehaviorSubject = new BehaviorSubject<string | null>(initialToken);
  }

  set(key: string, value: string): boolean {
    if (!this.storage) {
      return false;
    }

    this.storage.setItem(key, JSON.stringify(value));
    if (key === LocalStorageService.userJwtTokenField) {
      this.tokenBehaviorSubject.next(value);
    }
    return true
  }

  get(key: string): string|null {
    if (!this.storage) {
      return null;
    }

    let data = this.storage.getItem(key)!

    return data ? JSON.parse(data) : null;
  }

  remove(key: string): boolean {
    if (!this.storage) {
      return false;
    }

    this.storage.removeItem(key);
    if (key === LocalStorageService.userJwtTokenField) {
      this.tokenBehaviorSubject.next(null);
    }

    return true;
  }

  clear(): boolean {
    if (!this.storage) {
      return false
    }
    this.storage.clear()
    this.tokenBehaviorSubject.next(null)
    return true
  }

  getUserToken(): string|null {
    return this.get(LocalStorageService.userJwtTokenField);
  }

  setUserToken(userToken: string): boolean {
    return this.set(LocalStorageService.userJwtTokenField, userToken);
  }

  clearUserToken() {
    this.remove(LocalStorageService.userJwtTokenField)
  }

  getTokenObservable() {
    return this.tokenBehaviorSubject.asObservable();
  }
}
