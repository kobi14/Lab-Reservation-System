import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoleGuardService as RoleGuard } from './guards/auth.guard';
import { RoleGuardService2 as RoleGuard2 } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';

import { LabreservationComponent } from './components/labreservation/labreservation.component';
import { LabviewComponent } from './components/labview/labview.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { AddrolesComponent } from './components/addroles/addroles.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard, RoleGuard2] },
  { path: 'reserve', component: LabreservationComponent, canActivate: [AuthGuard, RoleGuard2] },
  { path: 'view', component: LabviewComponent, canActivate: [AuthGuard] },
  { path: 'dash', component: AdminpanelComponent, canActivate: [RoleGuard] },
  { path: 'adduser', component: AddrolesComponent,  },

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,

    LabreservationComponent,

    LabviewComponent,

    AdminpanelComponent,
    AddrolesComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, RoleGuard, RoleGuard2],
  bootstrap: [AppComponent]
})
export class AppModule { }
