import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { ActivityListComponent } from './components/activitylist/activitylist.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
{path: 'about', component: AboutComponent},
{path: 'login', component: LoginComponent},
{path: 'enroll', component: LoginComponent},
{path: 'logout', component: LogoutComponent},
{path: 'activities', component: ActivityListComponent},
{path: 'rewards', component: RewardsComponent},
{path: 'leaderboard', component: LeaderboardComponent},
{path: 'admin', component: AdminComponent},
{path: '',redirectTo:'about', pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
