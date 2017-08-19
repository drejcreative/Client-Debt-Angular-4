import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';

import { SettingsService } from '../shared/settings.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;

  constructor(
    public _flashMessagesService: FlashMessagesService,
    public _router: Router,
    public _authService: AuthService,
    public _settingsService: SettingsService
  ) { }

  ngOnInit() {
    this._authService.getAuth().subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this._settingsService.getSettings().allowRegistration;
  }

  onLogoutClick() {
    this._authService.logout();
    this._flashMessagesService.show('You are Logged out', { cssClass:'alert-success', timeout: 4000 });
    this._router.navigate(['/login']);
  }

}
