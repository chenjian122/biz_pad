import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { ConsultComponent } from './consult.component';
import { routing }       from './consult.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ConsultService} from "../../services/consult.service";
import { UserService} from "../../services/user.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    NgZorroAntdModule,
    routing
  ],
  declarations: [
    ConsultComponent

  ],
  providers: [
    ConsultService,
    UserService

  ]

})
export class ConsultModule {}
