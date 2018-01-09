import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';
import { OpportunityService} from "../../services/opportunity.service";
import { NgZorroAntdModule } from 'ng-zorro-antd';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgZorroAntdModule,
    routing
  ],
  declarations: [
    Dashboard

  ],
  providers: [
    OpportunityService

  ]

})
export class DashboardModule {}
