import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SettingsService } from '../../shared/settings.service';
import { ClientService } from '../../shared/client.service';

import { Client } from "../../models/Client";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client:Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  }

  disabledBalanceOnAdd: boolean = true;

  constructor(
    public _clientService: ClientService,
    public _flashMessagesService: FlashMessagesService,
    public _router: Router,
    public _settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disabledBalanceOnAdd = this._settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}:{value: Client, valid: boolean}) {
    if(this.disabledBalanceOnAdd) {
      value.balance = 0;
    }

    if(!valid) {
      this._flashMessagesService.show('Form is Not Vaild', { cssClass:'alert-danger', timeout: 4000 });
      this._router.navigate(['add-client']);
    } else {
      this._clientService.newClient(value);
      this._flashMessagesService.show('New Client Added', { cssClass:'alert-success', timeout: 4000 });
      this._router.navigate(['/']);
    }
  }

}
