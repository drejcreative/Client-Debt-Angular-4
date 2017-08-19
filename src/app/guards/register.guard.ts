import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../shared/settings.service';

@Injectable()

export class RegisterGuard implements CanActivate{

  constructor(
    private _router: Router,
    public _settingsService: SettingsService
  ) {}

  canActivate(): boolean {
    if(this._settingsService.getSettings().allowRegistration) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }


}
