import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SettingsService } from '../../shared/settings.service';
import { ClientService } from '../../shared/client.service';

import { Client } from "../../models/Client";

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };

  disabledBalanceOnEdit: boolean = true;

  constructor(
    public _clientService: ClientService,
    public _router: Router,
    public _route: ActivatedRoute,
    public _flashMessagesService: FlashMessagesService,
    public _settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];

    this._clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });

    this.disabledBalanceOnEdit = this._settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}:{value: Client, valid: boolean}) {
    if(!valid) {
      this._flashMessagesService.show('Form is Not Vaild', { cssClass:'alert-danger', timeout: 4000 });
      this._router.navigate(['edit-client/' + this.id]);
    } else {
      this._clientService.updateClient(this.id, value);
      this._flashMessagesService.show('Client Updated', { cssClass:'alert-success', timeout: 4000 });
      this._router.navigate(['/client/' +this.id]);
    }
  }

}
