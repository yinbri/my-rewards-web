import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ActivityListComponent } from './components/activitylist/activitylist.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { AdminComponent } from './components/admin/admin.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { AboutComponent } from './components/about/about.component';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActivityListComponent,
    RewardsComponent,
    AdminComponent,
    LeaderboardComponent,
    AboutComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
