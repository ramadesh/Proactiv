import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashComponent } from './dash/dash.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { VerifyComponent } from './verify/verify.component';
import { DataService } from './data.service'
import { MusicComponent } from './music/music.component';
import { MapsComponent } from './maps/maps.component';
import { TodoComponent } from './todo/todo.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PastjournalsComponent } from './pastjournals/pastjournals.component';
import { AddjournalentryComponent } from './addjournalentry/addjournalentry.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ResetpassComponent } from './resetpass/resetpass.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashComponent,
    ForgotPassComponent,
    VerifyComponent,
    MusicComponent,
    MapsComponent,
    TodoComponent,
    SettingsComponent,
    ProfileComponent,
    AddjournalentryComponent,
    EditprofileComponent,
    ResetpassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
