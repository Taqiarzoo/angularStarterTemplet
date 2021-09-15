import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute,Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MemberService } from 'src/app/services/member.service';
import { MasterService } from 'src/app/services/master.service';
import { FamilyService } from 'src/app/services/family.service';

class filter{
  static is_assign_family:boolean;
  static currentAreaId:string;
  static  currentGaliMohallaId:string;
  static currentLast_name:string;
}
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent implements OnInit {

  destroy: Subject<boolean> = new Subject<boolean>();

  familyArray:any=[]
  root:boolean= true;
  member:boolean=false;
  family:boolean=false;
  memberList:any[]=[]

  galliMohalla:any[]=[]
  lastNames:any[]=[]

  currentCountryId:any =1
  currentStateId:any=29
  currentCityId:any=1


  
  
form1:FormGroup
  enableCreateFamily: boolean=false;
  dataToPass: any;
  currentArea: any;
  areas: any;

  constructor(
    private member_service: MemberService,
    private fb:FormBuilder,
    private router:Router,
    private active:ActivatedRoute,
    private masterService:MasterService,
    private familyService: FamilyService,
    private location:Location
    ) {
      this.form1=fb.group({
        house_no:new FormControl(''),
        gali_mohalla:new FormControl(''),
        area:new FormControl(''),
        last_name:new FormControl(''),
        search:new FormControl(''),
      })
      let page= localStorage.getItem("page")
      if(page){
        if(page=='family'){
          this.family=true;
          this.root=false;
        }
      }else{
        localStorage.setItem('page','list')
      }
      masterService.getArea(1,29,1).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
        this.areas=data.areas
      })
      
      
     }

  getData(q:any, page:any, limit:any, order_by:any, order_dir:any,filters:any){
    this.member_service.getMembers(q, page, limit, order_by, order_dir,filters).pipe(takeUntil(this.destroy))
    .subscribe((data: any) => {
      this.memberList=data.member
    })
  }


  SelectToFamily(data:any,i:any,event,tableData){
    console.log(event.target.checked)
    if(event.target.checked){
      this.familyArray.push(data)
    }else{
      this.familyArray.splice(i, 1);
    }
    if(this.familyArray.length){
      this.enableCreateFamily=true;
    }else{
      this.enableCreateFamily=false;
    }

    console.log(this.familyArray)
    
  }
  onCreateFamily(){
    this.familyService.createFamily(
      {
        family:this.familyArray
      }
    )
      .pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      if(data.status==1){
          this.family=true
          this.dataToPass=this.familyArray
          console.log(this.dataToPass)
          this.root=false;
      }else{
        //TODO Error Handling
      }
    })
  }



  onCreateMember(){
    
  }

  onViewFamily(){
    
  }

  onAreaSelect(event){
    
   filter.currentAreaId=event.target.value
   this.masterService.getGalliMohalla(filter.currentAreaId).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
     this.galliMohalla=data.galli_mohalla
     this.form1.patchValue({
         house_no:null,
        gali_mohalla:null,
        last_name:null
    })
   })
  }

  onGMSelect(event){
    filter.currentGaliMohallaId=event.target.value
    this.masterService.getLastNames(filter.currentAreaId,filter.currentGaliMohallaId).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      this.lastNames=data.last_names
      this.form1.patchValue({
        house_no:null,
        last_name:null
    })
    })
  }
  onLastNameSelect(event){
    filter.currentLast_name=event.target.value
    this.form1.patchValue({
      house_no:null,
  })
  }

  
  ngOnInit(): void {
    this.active.queryParams.subscribe(data => {
        filter.is_assign_family=data.is_assign_family
        console.log(filter)
      this.getData(null,null,null,null,null,filter)
        this.form1.patchValue({
          house_no:null,
          gali_mohalla:null,
          area:null,
          last_name:null
      })
  })
    console.log(this.router.getCurrentNavigation())
    
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  onFilter(){
    this.getData(null,null,null,null,null,filter)
  }

  

  cancelFromChild(event) {
    this.root = true;
    this.familyArray=[]
    localStorage.setItem('page','list')
    if (event) {
      
    }
  }

}


