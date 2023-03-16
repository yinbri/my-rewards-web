import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';

const loginUrl = '/api/login_service';
const enrollUrl = '/api/enrollment_service';
const activityUrl = '/api/activities_service';
const useractivityUrl = '/api/useractivities_service';
const updateEnrollmentUrl = '/api/update_enrollment_service';
const adminUserLoginUrl = '/api/admin_login_service';
const pendingUserActivitiesUrl = '/api/pending_user_activities_service';
const eligibleUserActivitiesUrl = '/api/eligible_activity_service';
const rewardsActivityUrl = '/api/rewards_activity_service';
const retrieveLeadersUrl = '\api\leader_board_service';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  private authenticated : Subject<boolean>;
  private isMobile: boolean;

  constructor(private http: HttpClient) {
    this.authenticated = new Subject<boolean>();
    this.authenticated.next(false);
    this.isMobile = false;
   }

  login(data: any): Observable<any> {
    console.log("....login service....")
    return this.http.post(loginUrl, data);
  }

  enroll(data: any): Observable<any> {
    console.log("....enroll service....")
    return this.http.post(enrollUrl, data);
  }

  get_activities(data: any): Observable<any> {
    console.log("....activities service....")
    return this.http.get(activityUrl);
  }

  
  get_useractivities(data: any): Observable<any> {
    console.log("....useractivities service....")
    return this.http.post(useractivityUrl, data);
  }
  
  get_rewards_activities(data: any): Observable<any> {
    console.log("....useractivities service....")
    return this.http.post(rewardsActivityUrl, data);
  }

  update_enrollment(data: any): Observable<any>{
    console.log("update enrollment.");
    return this.http.post(updateEnrollmentUrl, data);
  }

  adminlogin(data: any): Observable<any> {
    console.log("....admin login service....")
    return this.http.post(adminUserLoginUrl, data);
  }

  get_pending_user_activities(data: any):Observable<any> {
    console.log("....admin get pending user activities....")
    return this.http.post(pendingUserActivitiesUrl, data);
  }

  get_eligible_user_activities(data: any):Observable<any> {
    console.log("....admin get eligible user activities....")
    return this.http.post(eligibleUserActivitiesUrl, data);
  }
  
  retrieve_leaders(data:any): Observable<any> {
    console.log("....retrieve leaders....")
    return this.http.get(retrieveLeadersUrl, data);
  }

  isAuthenticated(): Boolean{
    const username = sessionStorage.getItem("username")

    if (username == '' || username == null)
      return false;
    else
      return true;
  }

  logAuthentication(authenticated: boolean): void {
    this.authenticated.next(authenticated);
  }

  onAuthenticationChange(): Observable<boolean> {
    return this.authenticated;
  }

  logDeviceType(isMobile: boolean): void {
    this.isMobile = isMobile;
  }

  isMobileDevice(): boolean {
    return this.isMobile;
  }

}
