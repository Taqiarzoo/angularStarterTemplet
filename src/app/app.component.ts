import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-starter';
  version = 'Angular version 12.1.3';
  items = [
    {
      name: 'Family', link: 'member', queryParams:{},
      elements: [
        { name: 'Family', link: 'member/family',queryParams:{is_head_assign:null,is_relation_define:null}  },
        { name: 'Head Assign', link: 'member/family',queryParams:{is_head_assign:true,is_relation_define:false} },
        { name: 'Relation Assign', link: 'member/family',queryParams:{is_head_assign:true,is_relation_define:true} },
        // { name: 'breadcrumb', link: 'bootstrap/breadcrumb' },
        // { name: 'buttons', link: 'bootstrap/buttons' },
        // { name: 'collapse', link: 'bootstrap/collapse' },
        // { name: 'dropdowns', link: 'bootstrap/dropdowns' },
        // { name: 'forms', link: 'bootstrap/forms' },
        // { name: 'list-group', link: 'bootstrap/list-group' },
        // { name: 'modal', link: 'bootstrap/modal' },
        // { name: 'pagination', link: 'bootstrap/pagination' },
        // { name: 'popovers', link: 'bootstrap/popovers' },
        // { name: 'progress', link: 'bootstrap/progress' },
        // { name: 'spinners', link: 'bootstrap/spinners' },
      ]
    },
    {
      name: 'Masters', link: 'masters',queryParams:{},
      elements: [
        { name: 'masters', link: 'masters/area' ,queryParams:{}},
        { name: 'template-driven-forms', link: 'template-driven-forms',queryParams:{} },
        { name: 'components', link: 'components',queryParams:{} },
        { name: 'services', link: 'services',queryParams:{} }
      ]
    },
    {
      name: 'Reactive Form', link: 'reactive-form',queryParams:{},
      elements: [
        { name: 'prototype', link: 'reactive-form/prototype' ,queryParams:{}},
        { name: 'form-control', link: 'reactive-form/form-control' },
        { name: 'form-control-class', link: 'reactive-form/form-control-class',queryParams:{} },
        { name: 'form-group', link: 'reactive-form/form-group',queryParams:{} },
        { name: 'form-builder', link: 'reactive-form/form-builder',queryParams:{} },
        { name: 'form-builder-nested', link: 'reactive-form/form-builder-nested',queryParams:{} },
        { name: 'form-array', link: 'reactive-form/form-array',queryParams:{} },
        { name: 'form-multi', link: 'reactive-form/form-multi',queryParams:{} },
      ]
    },
  ];

  constructor(
    public router: Router,
    public renderer: Renderer2) { }

  onSelectMenu(link: any,queryParams?:any): void {

    const element = document.getElementById('bd-docs-nav');
    this.renderer.removeClass(element, 'show');
    const route = '/' + link;
    if(link=='all'){
      this.router.navigate(['/'],{queryParams: {
        is_assign_family: null
      }});
    }
    else if(link=='NotAttached'){
      this.router.navigate(['/'],{queryParams: {
        is_assign_family: false,
        is_head:true
      }});
    }else if(link=='Attached'){
      this.router.navigate(['member/family'],{queryParams: {
        is_assign_family: true
      }});
    }else{
      this.router.navigate([route],{queryParams});
    }
    
  }


}

