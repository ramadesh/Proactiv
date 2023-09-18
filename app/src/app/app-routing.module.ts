import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

const routes: Routes = [
  {component: RegisterComponent, path: 'register'},
  {component: LoginComponent, path: 'login'},
  {component: DashComponent, path: 'dash'},
  {component: ForgotPassComponent, path: 'forgotpass'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
