import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FamilyService } from 'src/app/services/family.service';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.component.html',
  styleUrls: ['./create-family.component.css']
})
export class CreateFamilyComponent implements OnInit {

  selectHeadFlag:boolean=true

  @Input() data:any
  @Output() cancel: EventEmitter<boolean>;
  relations:any[]=[];

  destroy: Subject<boolean> = new Subject<boolean>();
  form:FormGroup
  head:any;
  selected_relation:any[]=[]
  constructor(
    private fb:FormBuilder,
    private familyService:FamilyService,
    private masterService:MasterService
  ) { 
    this.form=new FormGroup({
      head: new FormControl(''),
      family_name: new FormControl(''),
      relation: new FormControl(''),
    })
    this.cancel = new EventEmitter<boolean>();
    console.log("Family Component")
    console.log(this.data)
    this.masterService.getRelations().pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      if(data.status==1){
        this.relations=data.relations
      }
    })

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
    localStorage.setItem('state',JSON.stringify(this.selectHeadFlag))
  }

  compareFn(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onSave(data){
    this.familyService.setRalationship({
      family:this.selected_relation,
      head:this.head,
      family_name:this.form.get('family_name').value
    }).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      
    })
  }

  onheadSelect(data){
    this.familyService.selectHead({
      family:this.data,
      head:this.head,
      area:{
        areaId:this.head.address[0].area.id,
        area:this.head.address[0].area.name
      }
    }).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
       if(data.status==1){
            this.selectHeadFlag=false
            localStorage.setItem('state',JSON.stringify(this.selectHeadFlag))
            this.form.patchValue({
              family_name: data.family_name
          })
       }
    })
    
  }

  onSelectRelation(memberId,event){
    console.log(memberId,event.target.value)
    this.selected_relation.push(
      {
        memberId:memberId,
        relationId:event.target.value
      }
    )
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
