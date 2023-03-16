import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Server } from 'http';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor(private service: CommonService, private http: HttpClient, private router: Router) { }
  
  data = []
  show1!: boolean;
  show2!: boolean;
  show3!: boolean;
  
  ngOnInit(): void {
    this.retrieveLeaders()
  }

  init(): void{
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;
  }

  retrieveLeaders(): void {
    this.service.retrieve_leaders({})
    .subscribe({
      next: (res) => {
        if (res["status"] == "success"){
          console.log("Retrieved learders......");
          this.data = res["leaders"];

          let size = this.data.length;

          this.init();

          if (size > 0) { this.show1 = true };
          if (size > 1) { this.show2 = true }; 
          if (size > 2) { this.show3 = true };

        } 
      },
      error: (e) => { 
        console.error(e);
      }
    });

}
}
