import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { CellValueChangedEvent, TabGuardComp } from 'ag-grid-community';

import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  public columnDefs = [
    {headerName: 'User Name', field: 'username', resizable: true,flex:2},
    {headerName: 'ID', field: 'id', resizable: true,flex:1},
    {headerName: 'Date', field: 'date', resizable: true,flex:2},
    {headerName: 'Place', field: 'place', resizable: true,flex:2},
    {headerName: 'Description', field: 'description', resizable: true,flex:2},
    {headerName: 'Points', field: 'points', resizable: true,flex: 2},
    {headerName: 'Status', field: 'status', flex:2, editable: true, cellEditor: 'agSelectCellEditor',cellEditorParams: {
      values:['Enrolled', 'Attended', 'Unenrolled']} }
  ];  

  public defaultColDef: ColDef = {
  sortable: true,
  filter: true,
  };

  public rowData: any[] = [];

  username ='';
  password ='';
  adminLoggedIn = false;
  loginFail = false;
  isMobile = false;

  constructor(private service: CommonService, private router: Router) { 
    this.isMobile = this.service.isMobileDevice();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("adminuser_signedin") == "True") {
      this.adminLoggedIn = true;
      this.prepareData();
    }
    else
      this.adminLoggedIn = false;
  }

  login(): void {
    console.log("adminuser log in....");

    const data = {
      username: this.username,
      password: this.password,
    };

    this.service.adminlogin(data)
    .subscribe({
      next: (res) => {
        console.log(res["status"]);
        if (res["status"] == "success"){
          sessionStorage.setItem("adminuser_signedin", "True");
          sessionStorage.setItem("adminusername", String(data.username));
          console.log(sessionStorage.getItem("username"));
          this.adminLoggedIn = true;
          this.loginFail = false;
          this.prepareData();
          this.router.navigate(["/admin"]);
        } else {
          this.loginFail = true;
        }
      },
      error: (e) => { 
        console.error(e);
        this.adminLoggedIn = false;
        this.loginFail = false;
      this.router.navigate(["/admin"]);
      }
    });

    
  }
 
  logout(): void {
    console.log("logging out....");
    sessionStorage.clear()
    this.adminLoggedIn = false;
    this.loginFail = false;
    this.router.navigate(["/admin"]);

  }

  // Example of consuming Grid Event
onCellClicked( e: CellClickedEvent): void {
  console.log('cellClicked', e);
}

// Example using Grid's API
clearSelection(): void {
  //this.agGrid.api.deselectAll();
}

 // Example load data from sever
onGridReady(params: GridReadyEvent) {
  console.log("....onGridReady().......")
  this.prepareData();
  if (this.isMobile) {
    this.agGrid.columnApi.setColumnsVisible(["id","date", "place","points"], false);
  }
}

prepareData():  void {
  var signedIn = sessionStorage.getItem("adminuser_signedin");
  if (signedIn == null || signedIn != "True")
    return;

  this.service.get_pending_user_activities({})
  .subscribe({
    next: (res) => {
      console.log(res);
      if (res["status"] == "success"){
        this.rowData = res["useractivities"];
      }
    }, 
    error: (e) => { 
      console.error(e);
    }
  })
}
getSessionData(varName: string){
  return sessionStorage.getItem(varName);
}

onCellValueChanged(event: CellValueChangedEvent) {
    console.log(event);
    var currentRow = event.data;
    var username = currentRow["username"];
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

