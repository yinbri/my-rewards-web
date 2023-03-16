import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';

import { Activity } from 'src/app/models/activity';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {

  public columnDefs = [
    {headerName: 'ID', field: 'id', resizable: true, flex:1},
    {headerName: 'Date', field: 'date', resizable: true,flex:2},
    {headerName: 'Place', field: 'place', resizable: true,flex:2},
    {headerName: 'Description', field: 'description', resizable: true,flex:2},
    {headerName: 'Rewards Points', field: 'points', resizable: true,flex: 2},
    {headerName: 'Status', field: 'status', flex:2, editable: false, cellEditor: 'agSelectCellEditor',cellEditorParams: {
      values:['Enrolled', 'Verified']} }
  ];  

  public rowData: any[] = [];
  public usersActivities: any[] = [];
  public activities: any[] = [];
  public total_pending = 0;
  public total_earned = 0;
  isMobile = false;

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  currentActivity: Activity = {};
  currentIndex = -1;
  title = '';

  isUserSignedIn = false;

  constructor(private service: CommonService, private http: HttpClient, private router: Router) { 
    this.isMobile = this.service.isMobileDevice();
  }

  updateUserSignedIn():void{
    var s = sessionStorage.getItem("username");
    if ( s == null || s.length==0 )
      this.isUserSignedIn = false;
    else
      this.isUserSignedIn = true;
  }

  ngOnInit(): void {
    this.updateUserSignedIn();

  }

  get_users_activities():  void {
    var username = sessionStorage.getItem("username");
    console.log("get_users_activities: username=", username);
    this.service.get_rewards_activities({"username":username})
    .subscribe({
      next: (res) => {
        console.log(res);
        if (res["status"] == "success"){
          this.rowData = res["useractivities"];
          this.total_pending = res["total_pending"];
          this.total_earned = res["total_earned"];
        } 
      },
      error: (e) => { 
        console.error(e);
      }
    })
  }
  
  setActiveActivity(activity: Activity, index: number): void {
    this.currentActivity = activity;
    this.currentIndex = index;
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

getUserName(){
  return sessionStorage.getItem("username");
}

}
