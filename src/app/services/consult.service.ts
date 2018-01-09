import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions, RequestMethod, Request} from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthenticationService } from "app/services/authentication.service";
import {CONSTANTS} from "../app.const";
import {HttpInterceptorService} from "./http-interceptor.service";
import {Consult} from '../models/consult';


@Injectable()
export class ConsultService {
  constructor(private http: HttpInterceptorService) {
  }


  getOpportunityInfoById(bizId:number){
    return this.http.get(CONSTANTS.API_URL.opportunity.getById + "/" + bizId,null);
  }

  listIndustry(){
    return this.http.get(CONSTANTS.API_URL.industry.list,null);
  }

  listPark(){
    return this.http.get(CONSTANTS.API_URL.park.list,null);
  }

  listBusinessScopeByIndustryCode(industryCode:String){
    return this.http.get(CONSTANTS.API_URL.industry.listBusinessScopeByIndustryCode,{industryCode:industryCode});
  }

  listPermitByScopeCode(scopeCode:String){
    return this.http.get(CONSTANTS.API_URL.industry.listPermitByScopeCode,{scopeCode:scopeCode});
  }

  listDictionaryByCondition(columnSearch:String){
    return this.http.get(CONSTANTS.API_URL.industry.listDictionaryByCondition,{columnSearch:columnSearch});
  }

  listNewHostCompany(){
    return this.http.get(CONSTANTS.API_URL.contract.listNewHostCompany,null);
  }

  listContactByCustomerId(customerId:number){
    return this.http.get(CONSTANTS.API_URL.contact.listContactByCustomerId,{customerId:customerId});
  }

  getCustomerBizByBizId(bizId:number){
    return this.http.get(CONSTANTS.API_URL.opportunity.getCustomerBizByBizId,{bizId:bizId});
  }

  saveConsult(consult:Consult){
    return this.http.post(CONSTANTS.API_URL.opportunity.save, consult);
  }


}
