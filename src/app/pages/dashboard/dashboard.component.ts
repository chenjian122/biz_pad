import {Component,ViewEncapsulation,OnInit} from '@angular/core';
import { Router }  from '@angular/router';
import {Opportunity} from '../../models/opportunity'
import {OpportunityService} from "../../services/opportunity.service";
import {AuthenticationService} from "../../services/authentication.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {

  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = true;
  search_content = "";
  constructor(private router: Router,private opportunityService: OpportunityService,private _message: NzMessageService,private authenticationService:AuthenticationService) {

  }

  ngOnInit() {
    this.getPageData();
  }

  getPageData(reset = false) {
    if (reset) {
      this._current = 1;
    }

    let opportunity = new Opportunity();
    opportunity.page = this._current - 1;
    opportunity.size = this._pageSize;
    opportunity.search = this.search_content;
    this._loading = true;
    this.opportunityService.page(opportunity).then(
      res => {
        if (res.success) {
          const data = res.data;
          this._total = data.totalElements;
          this._loading = false;
          if(data.content != null){
            this._dataSet = data.content;
          }else{
            this._dataSet = [];
          }
          
        }
      });
  }

  public signOut(){
    this.authenticationService.logout();
  }

  showConsultByBizId(bizId:number){
    this.router.navigate(['/pages/consult'], {  
      queryParams: {  
        bizId: bizId,  
      }  
    });  
  }

}
