import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { VerifyComponent } from './verify/verify.component';
import { MapsComponent } from './maps/maps.component';
import { MusicComponent } from './music/music.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PastjournalsComponent } from './pastjournals/pastjournals.component';
import { TodoComponent } from './todo/todo.component';
import { AddjournalentryComponent } from './addjournalentry/addjournalentry.component';
import { ResetpassComponent } from './resetpass/resetpass.component';
import { authGuard } from './auth.guard';
import { CalComponent } from './cal/cal.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {component: RegisterComponent, path: 'register'},
  {component: LoginComponent, path: 'login'},
  {component: VerifyComponent, path: 'verify'},
  {component: ForgotPassComponent, path: 'forgotpass'},
  {component: ResetpassComponent, path: 'resetpass'},
  {component: DashComponent, path: 'dash', canActivate:[authGuard],
    children: [
      {component: TodoComponent, path: 'todo', canActivate:[authGuard]}, 
      {component: MapsComponent, path: 'maps', canActivate:[authGuard]},
      {component: MusicComponent, path: 'music', canActivate:[authGuard]},
      {component: ProfileComponent, path: 'profile', canActivate:[authGuard]},
      {component: SettingsComponent, path: 'settings', canActivate:[authGuard]},
      {component: PastjournalsComponent, path: ''},
      {component: AddjournalentryComponent, path: 'addjournalentry', canActivate:[authGuard]},
      {component: CalComponent, path: 'cal', canActivate:[authGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
