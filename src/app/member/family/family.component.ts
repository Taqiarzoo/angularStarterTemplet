import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FamilyService } from 'src/app/services/family.service';


class filter{
  static is_head_assign:boolean;
  static is_relation_define:boolean;
  static currentAreaId:string;
  static  currentGaliMohallaId:string;
  static currentLast_name:string;
}

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.css']
})
export class FamilyComponent implements OnInit {

  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private familyservice:FamilyService,
    private active:ActivatedRoute,
  ) { }

  data:any[]=[]

  ngOnInit(): void {
    this.active.queryParams.subscribe(data => {
      filter.is_relation_define=data.is_relation_define
      filter.is_head_assign=data.is_head_assign
      console.log(filter)
    this.getData(null,null,null,null,null,filter)
     
})
  }

  getData(q:any, page:any, limit:any, order_by:any, order_dir:any,filters:any){
    this.familyservice.getFamilies(q, page, limit, order_by, order_dir,filters).pipe(takeUntil(this.destroy))
    .subscribe((data: any) => {
      this.data=data.data
      console.log(this.data)
    })
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
