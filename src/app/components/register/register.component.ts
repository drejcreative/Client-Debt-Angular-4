import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password: string;

  constructor(
    public _flashMessagesService: FlashMessagesService,
    public _router: Router,
    public _authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._authService.register(this.email, this.password)
      .then((res) => {
        this._flashMessagesService.show('You are Registered', { cssClass:'alert-success', timeout: 4000 });
        this._router.navigate(['/']);
      })
      .catch((err) => {
        this._flashMessagesService.show(err.message, { cssClass:'alert-danger', timeout: 4000 });
        this._router.navigate(['/login']);
      });
  }

}
