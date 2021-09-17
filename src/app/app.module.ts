import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/general/home/home.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CommonModule } from '@angular/common';
import { HeadSelectComponent } from './models/head-select/head-select.component';
import { GeneralAtertComponent } from './models/general-atert/general-atert.component';
import { ErrorAtertComponent } from './models/error-atert/error-atert.component';
import { FamilyinfoComponent } from './models/familyinfo/familyinfo.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
 
    HeadSelectComponent,
    GeneralAtertComponent,
    ErrorAtertComponent,
    FamilyinfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    BsDatepickerModule.forRoot(), 
   
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }