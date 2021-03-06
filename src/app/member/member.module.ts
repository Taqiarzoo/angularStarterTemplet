import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component';
import { CreateComponent } from './member/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateFamilyComponent } from './member/create-family/create-family.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FamilyComponent } from './family/family.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/member/list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: MemberComponent,
        data:{
          title:'Members List'
        }
      },
      {
        path: 'create',
        component: CreateComponent,
        data:{
          title:'Members Add'
        }
      },
      {
        path: 'family',
        component: FamilyComponent,
        data:{
          title:'Family'
        }
      }
    ]
    }
  ]

@NgModule({
  declarations: [
    MemberComponent,
    CreateComponent,
    CreateFamilyComponent,
    FamilyComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AngularMultiSelectModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
    
  ]
})
export class MemberModule { }
