import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { SettingsService } from '../../shared/settings.service';

import { Settings } from "../../models/Settings";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  rules:Settings;

  constructor(
    public _settingsService: SettingsService,
    public _router: Router,
    public _flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.rules = this._settingsService.getSettings();
  }

  onSubmit() {
    this._settingsService.setRules(this.rules);
    this._flashMessagesService.show('Settings changed successfully', { cssClass:'alert-success', timeout: 4000 });
    this._router.navigate(['/']);
  }

}
