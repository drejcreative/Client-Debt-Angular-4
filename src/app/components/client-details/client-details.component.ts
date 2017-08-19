import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ClientService } from '../../shared/client.service';

import { Client } from "../../models/Client";


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})

export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    public _clientService: ClientService,
    public _router: Router,
    public _route: ActivatedRoute,
    public _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    
    this._clientService.getClient(this.id).subscribe(client => {
      if(client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
    });
  }
  
  updatedBalance(id:string) {
    this._clientService.updateClient(this.id, this.client);
    this._flashMessagesService.show('Balance Updated', { cssClass:'alert-success', timeout: 4000 });
    this._router.navigate(['/client/' + this.id]);
    this.showBalanceUpdateInput = false;
  }
  
  onDeleteClick() {
    if(confirm("Are you sure that you want to Delete")) {
      this._clientService.deleteClient(this.id);
      this._flashMessagesService.show('Client Deleted', { cssClass:'alert-success', timeout: 4000 });
      this._router.navigate(['/']);
    }
  }

}
