import { Routes, RouterModule }  from '@angular/router';

import { ConsultComponent } from './consult.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ConsultComponent,

  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
