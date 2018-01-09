import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, Request} from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from "app/services/authentication.service";
import {Opportunity} from "../models/opportunity";
import {CONSTANTS} from "../app.const";
import {HttpInterceptorService} from "./http-interceptor.service";


@Injectable()
export class OpportunityService {
  constructor(private http: HttpInterceptorService) {
  }


  page(opportunity: Opportunity) {
    const options =  new RequestOptions({
      method: RequestMethod.Get,
      url: CONSTANTS.API_URL.opportunity.page,
      search: opportunity
    });
    return this.http.request(new Request(options));
  }


}
