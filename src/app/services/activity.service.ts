import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/models/activity'

const baseUrl = '/api/activities_service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(baseUrl);
  }

  getActivities(data: any): Observable<any> {
    console.log("....activities service....")
    return this.http.post(baseUrl, data);
  }
}
