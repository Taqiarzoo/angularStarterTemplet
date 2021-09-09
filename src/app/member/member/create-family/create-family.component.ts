import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.component.html',
  styleUrls: ['./create-family.component.css']
})
export class CreateFamilyComponent implements OnInit {

  @Input() data:any
  @Output() cancel: EventEmitter<boolean>;
  form:FormGroup
  head:any;
  constructor() { 
    this.form=new FormGroup({
      head: new FormControl('')
    })
  }


  selectHead(data:any,i:any,event,tableData){
    console.log(event.target.checked)
    this.head=data;
    
  }

  ngOnInit(): void {
  }

}
