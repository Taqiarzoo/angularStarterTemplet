import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area/area.component';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/masters/area',
        pathMatch: 'full'
      },
      {
        path: 'area',
        component: AreaComponent,
        data:{
          title:'Masters Area'
        }
      },
      // {
      //   path: 'family',
      //   component: CreateFamilyComponent,
      //   data:{
      //     title:'Members Add'
      //   }
      // }
    
    ]
    }
  ]

@NgModule({
  declarations: [
    AreaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule
  ]
})
export class MastersModule { }
