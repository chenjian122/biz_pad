import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, Request} from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from "app/services/authentication.service";
import {User} from "../models/user";
import {CONSTANTS} from "../app.const";
import {HttpInterceptorService} from "./http-interceptor.service";


@Injectable()
export class UserService {
  constructor(private http: HttpInterceptorService) {
  }


  page(user: User) {
    const options =  new RequestOptions({
      method: RequestMethod.Get,
      url: CONSTANTS.API_URL.user.page,
      search: user
    });
    return this.http.request(new Request(options));
  }

  deleteById(id: number) {
     return this.http.delete( CONSTANTS.API_URL.user.delete + "/" + id ,null);
  }

  getLoginUser(){
    return this.http.get(CONSTANTS.API_URL.user.getLoginUser,null);
  }


}
