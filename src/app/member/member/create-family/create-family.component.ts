import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.component.html',
  styleUrls: ['./create-family.component.css']
})
export class CreateFamilyComponent implements OnInit {

  selectHeadFlag:boolean=true

  @Input() data:any
  @Output() cancel: EventEmitter<boolean>;
  form:FormGroup
  head:any;
  constructor(
    private fb:FormBuilder
  ) { 
    this.form=new FormGroup({
      head: new FormControl(''),
      family_name: new FormControl(''),
      relation: fb.array([]),
    })
    this.cancel = new EventEmitter<boolean>();
    console.log("Family Component")
    console.log(this.data)
  }


  selectHead(data:any,i:any,event,tableData){
    console.log(event.target.checked)
    this.head=data;
    console.log(data)
  }

  get realtion():FormArray{
    return this.form.get('relation') as FormArray
  }

  

 

  ngOnInit(): void {
    let page=localStorage.getItem('page')
        if(page=='family' && !this.data){
          let data = JSON.parse(localStorage.getItem("datas"));
          let state= JSON.parse(localStorage.getItem('state'));
          if(state=='true'){
            this.selectHeadFlag=true
          }else{
            this.selectHeadFlag=false
          }
          this.data=data;
        }else if(this.data){
          localStorage.setItem("datas", JSON.stringify(this.data));
          localStorage.setItem("page", 'family')
          localStorage.setItem('state',JSON.stringify(this.selectHeadFlag))
        }
  }

  onCancel(){
    this.cancel.emit(true);
  }

  onReturn(){
    this.selectHeadFlag=true
  }

  compareFn(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onSave(data){
    this.selectHeadFlag=false
    this.form.patchValue({
      family_name: this.head.area+"/"+this.head.last_name
    })
  }

}
