import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ResetpassComponent } from './resetpass/resetpass.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthInterceptor } from './auth_interceptor';
import { AuthService } from './auth.service';
import { NoteComponent } from './note/note.component';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CalComponent } from './cal/cal.component';
import { Schedule2Component } from './schedule2/schedule2.component';
import { ToolsComponent } from './tools/tools.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
// import { SpotifyService } from './spotify.service';

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
    ResetpassComponent,
    NoteComponent,
    CalComponent,
    Schedule2Component,
    ToolsComponent,
    CalculatorComponent,
    StopwatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    DragDropModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.spotify.com'],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [DataService, AuthService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
