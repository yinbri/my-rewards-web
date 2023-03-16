import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: String ='';
  password: String ='';
  
  isLoginFailed: Boolean = false;
  
  constructor(private service: CommonService, private router: Router) { 
  }

  ngOnInit(): void {

  }

  login(): void {
    console.log("log in....");

    const data = {
      username: this.username,
      password: this.password,
    };
    this.service.login(data)
    .subscribe({
      next: (res) => {
        console.log(res["status"]);
        if (res["status"] == "success"){
          this.isLoginFailed = false;
          sessionStorage.setItem("username", String(data.username));
          this.service.logAuthentication(true);
          this.router.navigate(["/activities"]);
        } 
        else {
          this.service.logAuthentication(false);
          this.isLoginFailed = true;
        }
      },
      error: (e) => { 
        console.error(e);
        this.router.navigate(["/login"]);
      }
    });  
  }

  enroll(): void {
    console.log("enroll...");

    const data = {
      username: this.username,
      password: this.password,
    };

    this.service.enroll(data)
    .subscribe({
      next: (res) => {
        console.log(res["status"]);
        if (res["status"] == "success")
          sessionStorage.setItem("username", String(data.username))
          this.service.logAuthentication(true);
      },
      error: (e) => console.error(e)
    });
  } 
}

