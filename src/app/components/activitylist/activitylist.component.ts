
import { Component, OnInit, ViewChild } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { CommonService } from 'src/app/services/common.service';

import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent, CellValueChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activitylist',
  templateUrl: './activitylist.component.html',
  styleUrls: ['./activitylist.component.css']
})
export class ActivityListComponent implements OnInit {

  public columnDefs = [
    {headerName: 'ID', field: 'id', resizable: true, flex:1},
    {headerName: 'Date', field: 'date', resizable: true, flex:2},
    {headerName: 'Place', field: 'place', resizable: true, flex:2},
    {headerName: 'Description', field: 'description', resizable: true, flex:2},
    {headerName: 'Rewards', field: 'points', resizable: true,flex: 2},
    {headerName: 'Action', field: 'status', flex:2, editable: true,
            cellEditor: 'agSelectCellEditor',cellEditorParams: {values:['Unenrolled', 'Enrolled']} }
  ];
  
  public username: String = "";
  public isAuthenticated = false;
  public isMobile = false;

  public rowData: Activity[] = [];
  public usersActivities: String[] = [];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  activities: Activity[] = [];
  currentActivity: Activity = {};
  currentIndex = -1;
  title = '';

  constructor(private service: CommonService, private http: HttpClient, private router: Router) { 


  }
  
  ngOnInit(): void {
     
    this.service.onAuthenticationChange().subscribe(
      (authenticated) => {
          if (authenticated) {
              this.isAuthenticated = true;
          } else {
              this.isAuthenticated = false;
          }
      }
    );
    
    if (this.service.isAuthenticated() ) {
      this.isAuthenticated = true;
      this.username = String(sessionStorage.getItem("username"));
    }
    else
      this.isAuthenticated = false;

    this.get_users_activities();

    this.isMobile = this.service.isMobileDevice();

    console.log("activity.isMobile: ", this.isMobile);

  }

  get_users_activities(): void {
    
    if (!this.isAuthenticated)
      return;

    const data = {
      "username": this.username
    };

    console.log("ActivityListComponent.get_users_activities: username=", this.username);
    this.service.get_eligible_user_activities(data)
    .subscribe({
      next: (res) => {
        if (res["status"] == "success"){
          this.rowData = res["activities"];
          console.log("Retrieved activities......", this.rowData);
        } 
      },
      error: (e) => { 
        console.error(e);
      }
    });
     
  }
  
  setActiveActivity(activity: Activity, index: number): void {
      this.currentActivity = activity;
      this.currentIndex = index;
  }

  isActionEditable(params: any): boolean {
    console.log("is Editable?..... ", params);

    if ( params == "Enrollled" || params == "Unenrolled")
      return true;
    else
      return false;
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

   // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    console.log("....onGridReady().......")
    this.get_users_activities();

    if (this.isMobile) {
      this.agGrid.columnApi.setColumnsVisible(["id","place","points"], false);
    }

    console.log(this.rowData);
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    // handle the rest here
    console.log("cell content changed......")
    console.log(event);
    var currentRow = event.data;
      var username = sessionStorage.getItem("username");
      this.service.update_enrollment({"username":username, "rowvalue":currentRow})
        .subscribe({
          next: (res) => {
            if (res["status"] == "success")
              console.log("Updata success......");
            else
              console.log("Updata failed......", res["messsage"]);
          },
          error: (e) => { 
            console.error(e);
          }
        });
  }
}

