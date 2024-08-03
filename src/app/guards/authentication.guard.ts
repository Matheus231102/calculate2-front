import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LocalStorageService} from "../services/local-storage.service";

export const authenticationGuard: CanActivateFn = (route, state) => {
  let localStorageService= inject(LocalStorageService)
  let router= inject(Router)

  if (!localStorageService.getUserToken()) {
    router.navigate(["login"])
    return false;
  }

  return true;
};
