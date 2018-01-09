import {Component,ViewEncapsulation,OnInit} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import {ConsultService} from "../../services/consult.service";
import {AuthenticationService} from "../../services/authentication.service";
import {NzMessageService} from "ng-zorro-antd";
import 'rxjs/add/operator/switchMap';
import {Consult} from '../../models/consult';
import {Contact} from '../../models/contact';
import {Opportunity} from '../../models/opportunity';
import {BizProductSearch} from '../../models/bizProductSearch';
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {Contract} from "../../models/contract";


@Component({
  selector: 'consult',
  styleUrls: ['./consult.scss'],
  templateUrl: './consult.html'
})
export class ConsultComponent implements OnInit {
  opportunity = new Opportunity();
  contact = new Contact();
  bizProductSearch = new BizProductSearch();
  consult = new Consult();
  contract = new Contract();
  bizId;
  industrys;
  parks;
  businessScopes;
  permits;
  selectedPermit;
  companyKinds;
  companySuffixTypes;
  selectedCustomerContact;
  customerContacts;
  signName;
  selectedCompany;
  companys;
  customerId:number;
  user:User;

  constructor(private userService:UserService,private route:ActivatedRoute,private consultService: ConsultService,private _message: NzMessageService,private authenticationService:AuthenticationService) {
    
  }

  createMessage = (type, text) => {
    this._message.create(type,text,{nzDuration: 5000});
  }

  signed(){
    this.opportunity.loginUserId = this.user.userId;
    this.consult.bizProductSearch = this.bizProductSearch;
    this.consult.contact = this.contact;
    this.consult.opportunity = this.opportunity;
    this.contract.contractType = "01";
    this.contract.custSignerId = this.contract.custRepresentative;
    this.consult.contract = this.contract;
    this.consultService.saveConsult(this.consult).then(
      res => {
        if (res.success) {
          this.createMessage("success","签订成功");
        }else{
          this.createMessage("error",res.msg);
        }
      }
    );
  }

  listBusinessScopeByIndustryCode(){
    this.consultService.listBusinessScopeByIndustryCode(this.bizProductSearch.p1).then(
      res => {
        if(res.success){
          var keepGoing = true;
          this.businessScopes = res.data;
          this.businessScopes.forEach(element =>{
            if(keepGoing) {
              if(element.scopeCode == this.bizProductSearch.p2){
                keepGoing = false;
              }else{
                this.bizProductSearch.p2 = null;
              }
            }
          });
          this.listPermitByScopeCode();
        }
      }
    )
  }

  listPermitByScopeCode(){
    this.consultService.listPermitByScopeCode(this.bizProductSearch.p2).then(
      res => {
        if(res.success){
          var keepGoing = true;
          this.permits = res.data;
          if(this.permits.length == 0){
            this.bizProductSearch.p16 = null;
          }
          this.permits.forEach(element =>{
            if(keepGoing) {
              if(element.permitCode == this.bizProductSearch.p16){
                keepGoing = false;
              }else{
                this.selectedPermit = null;
              }
            }
          })
        }
      }
    )
  }

  getPermitByBusinessScope(e){
    this.listPermitByScopeCode();
  }

  searchChange(e){
    this.listBusinessScopeByIndustryCode();
  }
 
  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.bizId = queryParams.bizId;
      this.consultService.getOpportunityInfoById(this.bizId).then(
        res => {
          if (res.success) {
            const data = res.data;
            this.contact = data.contactDto;
            this.opportunity = data.opportunityDto
            this.bizProductSearch = data.bizProductSearchDto;
            if(data.contractDto != null){
              this.contract = data.contractDto;
            }
            this.listBusinessScopeByIndustryCode();
          }
        }
      );
    });

    this.consultService.listIndustry().then(
      res => {
        if(res.success){
          this.industrys = res.data;
        }
      }
    )

    this.consultService.listPark().then(
      res => {
        if(res.success){
          this.parks = res.data;
        }
      }
    )

    this.consultService.listDictionaryByCondition("company_kind").then(
      res => {
        if(res.success){
          this.companyKinds = res.data;
        }
      }
    )

    this.consultService.listDictionaryByCondition("company_suffix_type").then(
      res => {
        if(res.success){
          this.companySuffixTypes = res.data;
        }
      }
    )
    
    this.consultService.listNewHostCompany().then(
      res => {
        if(res.success){
          this.companys = res.data;
        }
      }
    )

    this.consultService.getCustomerBizByBizId(this.bizId).then(
      res => {
        if(res.success){
          this.customerId = res.data;
          this.consultService.listContactByCustomerId(this.customerId).then(
            res => {
              if(res.success){
                this.customerContacts = res.data;
                this.contract.custRepresentative = this.customerContacts[0].contactId;
              }
            }
          )
        }
      }
    )

    this.userService.getLoginUser().then(
      res => {
        if(res.success){
          this.user = res.data;
          this.signName = this.user.userName;
          this.contract.hostSignerId = this.user.userId;
        }
      }
    )
  }

}
