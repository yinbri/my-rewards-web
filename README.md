# Context
This project illustrate how to develop a web applicaiton with Angular and this is my first high school Angular project.

# Dependency 
This project depends on the APIs provided in other project at (https://github.com/yinbri/my-rewards-api.git). The API project needs to installed and tested successfully first so that this project has the needed APIs in place.

# Install Node.js (skip if you have it installed already)

Download Node.js from: https://nodejs.org/en/download/current/, e.g. Windows Installer 64-bit, and run the installation. This will also install NPM (NodeJS Package Manager). Test NodeJS installation

```
>node --version
V18.14.2
```
# Install Angular CLI
```
    >npm install -g @angular/cli

    - Or upgrade if needed
  
    >ng update @angular/cli @angular/core

    - if download code from Github

    >npm install
```

# Create an Angular application
```
    >ng new my-rewards-web
```

# Test the application
```
    >cd my-rewards-web
    >ng serve --port 8081 --open
    The "--open" flag will open browser to access the application
```

# Install ag grid 
The grid can be found at https://ag-grid.com/angular-data-grid/getting-started/#grid-dependencies

```
    >press ctrl-c to stop the app if it is running
    >npm install --save ag-grid-community
    >npm install --save ag-grid-angular
```

# Install ngx-device-detector
It is used by this project to detect whether mobile browser is used. This project adjust the contents to fit into mobiel that has smaller screens.

```
    >npm install ngx-device-detector --save
```

# Add more components to create a skeleton
```
    >cd .\src\app
    >ng g class models/activity --type=model
    >ng g c components/about
    >ng g c components/activitylist
    >ng g c components/admin
    >ng g c components/leaderboard
    >ng g c components/login
    >ng g c components/logout
    >ng g c components/rewards
```

# Code documentation

### proxy.config.json
It is a proxy that proxy all API request from Angular components to the Python API hosted by the other project. All requests that have the "/api/" keyword included in URL will be proxyed to the Python API.

### index.html
This is the entry point and it contains the Angular app itself using a tag of <app-root>.

### app.modules.ts
It contains all modules created in this application and imported modules including the AgGridModule.

### app.component.ts
It uses the ngx-device-detector library to determine whether the application is processing a request from mobile browser and if yes, it sets the value of the isMobile indicator to be True and save it in the commonService class as well.

### app.component.html
It is the home page of the application that contains the navigation bar, which displays "Sign Out", "Activities",  "Rewards" and "Admin" menu for signed in users. It uses the *ngIf Angular tag to hide HTML elements, such as it hides "About" for mobile users due to limited screen size on mobile.

### app-routing.module.ts
It contains the Angular Routes that maps an incoming URL to an Angular component.

### about
This component contains the static contents in the about.component.html file. It has my school's lego, name and instructions of how to use this application.

### login
The login.component.html presents email and password for user to enter. If username and password entered can't be found it will present error message. It binds the two data fields (username, password) on HTML with the data fields in the login.component.ts. The login.component.ts calls the commonService to process login request. If a login is a success, it records authentication as yes in the commonService and save username into session storage. It also navigates to the activity component so that user can see the activities after a successful log in. The same component supports enrollment as well.

### activitylist
The activitylist.html uses the AgGrid control to present activity list. The AgGrid has a tag named as <ag-grid-angular>. The list of parameters in the tag is to support adjustment of the default behavior of the grid. Two key inputs are [columnDef] that provides a list of columns, and [rowData] that provides that actual data for the grid to present. 
The activitylist.ts contains column definitions of the grid. It also calls the commonService to retrieve the list of activities and assign it to the [rowData].

### Refer to source codes for other components
All code follow the same Angular component structure with each component contains ts file, html file and css file.

# start the Angular web application
```
    >cd my-rewards-web
    >ng serve --port 8081
```

# access the web application from browser
```
    http://localhost:8081
    or try the following if localhost does not work on your browser
    http://[::1]:8081
```

# Appendix

## Short reference to git commands
```
git init
git add -A
git commit -m 'Added my project'
git branch -M main
git remote add origin https://github.com/yinbri/my-rewards-web.git
git push -u -f origin main
```
## Push changed code to Github
```
git add READEME.md
git commit -m "updated README.md"
git push -u -f origin main
```
