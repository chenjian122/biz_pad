import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import {CONSTANTS} from "../app.const";
import {UserService} from "../services/user.service";
import {User} from "../models/user";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'pages',
  styleUrls: ['./pages.scss'],
  template: `
    <header>
      <div>
        <a href routerLink="/pages/dashboard">
          <img src="/assets/img/logo.png" />
        </a>
      </div>
      <div>
        <a>
          <img src="/assets/img/head.png" />
        </a>
        <a href class="signout" (click)=signOut()>
          <img src="/assets/img/sign-out.png" />
        </a>
      </div>
    </header>
    <router-outlet></router-outlet>
    `
})
export class Pages {

  constructor(private userService:UserService,private authenticationService:AuthenticationService ) {
  }
  ngOnInit() {
    

  }

  public signOut(){
    this.authenticationService.logout();
  }
}
