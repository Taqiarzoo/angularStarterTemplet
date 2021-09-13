import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MemberService } from 'src/app/services/member.service';

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
  memberList:any[]=
  [
    {
    id:20,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:1,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:2,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:3,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:4,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:5,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:6,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:7,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:8,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:9,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:10,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:11,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:12,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:13,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:14,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  {
    id:15,
    member_no:"121212",
    first_name:"Thornton",
    last_name: "Jacob",
    relative: "abc",
    house_no: "F/19",
    gali_mohalla:'satiya Vaihar',
    area:'lalKothi',
    city:'jaipur',
  },
  
]
  
  
form1:FormGroup
  enableCreateFamily: boolean=false;
  dataToPass: any;

  constructor(
    private member_service: MemberService,
    private fb:FormBuilder
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
     }

  getData(q:any, page:any, limit:any, order_by:any, order_dir:any){
    this.member_service.getMembers(q, page, limit, order_by, order_dir).pipe(takeUntil(this.destroy))
    .subscribe((data: any) => {
      console.log(data)
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
    this.family=true
    this.dataToPass=this.familyArray
    console.log(this.dataToPass)
    this.root=false;
    console.log(this.dataToPass)
  }



  onCreateMember(){
    // this.member=true
    // this.dataToPass={}

    // this.root=false;
  }

  
  ngOnInit(): void {
    this.getData(null,null,null,null,null)
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  

  cancelFromChild(event) {
    this.root = true;
    this.familyArray=[]
    localStorage.setItem('page','list')
    if (event) {
      
    }
  }

}


