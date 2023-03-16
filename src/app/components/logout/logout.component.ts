import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service: CommonService) { }

  ngOnInit(): void {
    console.log("logging out....");
    sessionStorage.clear();
    this.service.logAuthentication(false);
  }

}
