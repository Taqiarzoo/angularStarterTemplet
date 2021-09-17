import { Component, DoCheck, IterableDiffers, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MasterService } from 'src/app/services/master.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit,DoCheck  {
  countries: any;

  destroy: Subject<boolean> = new Subject<boolean>();
  currentStateId: any;
  currentCityId: any;
  states: any;
  cities: any;
  areas: any;
  form:FormGroup
  iterableDiffer: any;
  constructor(
    private masteService:MasterService,
    private iterableDiffers: IterableDiffers
  ) { 
    this.form=new FormGroup({
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl('')
    })
    this.iterableDiffer = iterableDiffers.find([]).create(null);
    this.masteService.getCountry().pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      this.countries=data.countries
    })
  }

  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      id: {
        title: 'ID',
        editable:false
      },
      name:{
        title:'Area Name'
      },
      countryId:{
        title:'Country Id',
        editor: {
          type: 'list',
          config: {
            list: []
          }
        }
      },
      stateId:{
        title:'State Id',
        editor: {
          type: 'list',
          config: {
            list: []
          }
        }
      },
      cityId:{
        title:'City Id',
        editor: {
          type: 'list',
          config: {
            list: []
          }
        }
      }

    }
  };

  data = [
    {
      id: 3,
      name: "Damsna",
      countryId: 1,
      stateId: 10,
      cityId:10,
    },
    {
      id: 2,
      name: "Ervin Howell",
      countryId: 1,
      stateId: 10,
      cityId:10,
    },
    
    // ... list of items
    
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];

  ngOnInit(): void {

   
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.settings.columns.countryId.editor.config.list);
    if (changes) {
        console.log(changes);
    }
    // console.log(this.settings.columns)
  }


  onCountrySelect(event){
    this.currentCuntryId=event.target.value;
   this.masteService.getState(this.currentCuntryId).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
     this.states=data.states
   }) 
      let country=this.countries.find(con=>con.id==this.currentCuntryId)
          this.settings.columns.countryId.editor.config.list.push({value:country.id,title:country.name});
          console.log(country)

      // console.log(this.settings.columns.countryId.editor.config.list)
      this.settings = Object.assign({}, this.settings);
  }

  chnage(){
    for (let index = 0; index < this.countries.length; index++) {
      const element = this.countries[index];
      this.settings.columns.countryId
   }
  //  console.log(this.settings.columns.countryId.editor.config.list)
  }

  onStateSelect(event){
    this.currentStateId=event.target.value
    this.masteService.getcities(this.currentCuntryId,this.currentStateId).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      this.cities=data.cities
      let state=this.states.find(con=>con.id==this.currentStateId)
      console.log(state)
          this.settings.columns.stateId.editor.config.list.push({value:state.id,title:state.name});
          console.log(this.settings.columns.stateId.editor.config.list)
    }) 
        
  }
  currentCuntryId(currentCuntryId: any, currentStateId: any) {
    throw new Error('Method not implemented.');
  }

  onCitySelect(event){
    this.currentCityId=event.target.value
    this.masteService.getArea(this.currentCuntryId,this.currentStateId,this.currentCityId).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      this.areas=data.areas
      let city=this.cities.find(con=>con.id==this.currentCityId)
          this.settings.columns.cityId.editor.config.list.push({value:city.id,title:city.name});
    })
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  OnCreate(event){
    console.log("Data")
    console.log(event)
  }

  

  compareFn(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
