import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../shared/client.service';
import { SettingsService } from '../../shared/settings.service';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string;
  password: string;
  showRegister:boolean;

  constructor(
    public _clientService: ClientService,
    public _flashMessagesService: FlashMessagesService,
    public _router: Router,
    public _authService: AuthService,
    public _settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.showRegister = this._settingsService.getSettings().allowRegistration;
  }

  onSubmit() {
    this._authService.login(this.email, this.password)
    .then((res) => {
      this._flashMessagesService.show('You are logged in', { cssClass:'alert-success', timeout: 4000 });
      this._router.navigate(['/']);
    })
    .catch((err) => {
      this._flashMessagesService.show(err.message, { cssClass:'alert-danger', timeout: 4000 });
      this._router.navigate(['/login']);
    });
  }

}
