import { Component, OnInit } from '@angular/core';
import { CommonService } from './services/common.service';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'my-rewards';
  isAuthenticated = false;
  isMobile = false;

  user_name: String = "";

  constructor(private service: CommonService, private deviceService: DeviceDetectorService) { 
    this.epicFunction();
    this.service.logDeviceType(this.isMobile);
  }

  epicFunction() {
    
    this.isMobile = this.deviceService.isMobile();
    //this.isTablet = this.deviceService.isTablet();
    //this.isDesktopDevice = this.deviceService.isDesktop();    
    //console.log(this.deviceService.getDeviceInfo());
    console.log("isMobile: ", this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    //console.log(this.isTablet);  // returns if the device us a tablet (iPad etc)
    //console.log(this.isDesktopDevice); // returns if the app is running on a Desktop browser.
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

    if (this.service.isAuthenticated())
      this.isAuthenticated = true;
    else
      this.isAuthenticated = false;
  }

}
