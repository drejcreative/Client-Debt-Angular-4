import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';

//AngularFire imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

//Services import
import { ClientService } from './shared/client.service';
import { AuthService } from './shared/auth.service';
import { SettingsService } from './shared/settings.service';

const appRoutes:Routes = [
  { path:'', component: DashboardComponent, canActivate:[AuthGuard] },
  { path:'register', component: RegisterComponent, canActivate:[RegisterGuard] },
  { path:'login', component: LoginComponent },
  { path: 'settings', component: SettingsComponent, canActivate:[AuthGuard] },
  { path: 'add-client', component: AddClientComponent, canActivate:[AuthGuard] },
  { path: 'client/:id', component: ClientDetailsComponent, canActivate:[AuthGuard] },
  { path: 'edit-client/:id', component: EditClientComponent, canActivate:[AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
]

// Add your own Firebase Config
export const firebaseConfig = {
    apiKey: "AIzaS************************",
    authDomain: "clientapp-************************.com",
    databaseURL: "https://clientapp-************************.com",
    storageBucket: "clientapp-************************.com",
    messagingSenderId: "************************"
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ClientService,
    AuthService,
    AuthGuard,
    RegisterGuard,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
