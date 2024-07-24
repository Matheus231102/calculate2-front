import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public static userJwtTokenField: string = "calculate-macro-jwt";
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: string): boolean {
    if (!this.storage) {
      return false;
    }

    this.storage.setItem(key, JSON.stringify(value));
    return true

  }

  get(key: string): string|null {
    if (!this.storage) {
      return null;
    }

    let data = this.storage.getItem(key)!

    if (!data) return null;
    return JSON.parse(data);
  }

  remove(key: string): boolean {
    if (!this.storage) {
      return false;
    }

    this.storage.removeItem(key);
    return true;
  }

  clear(): boolean {
    if (!this.storage) {
      return false
    }

    this.storage.clear()
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
}
