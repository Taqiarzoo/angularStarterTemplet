import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MasterService } from 'src/app/services/master.service';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form:FormGroup

  destroy: Subject<boolean> = new Subject<boolean>();

  @Input() data:any
  @Output() cancel: EventEmitter<boolean>;
  @ViewChild('gm', { static: false }) gmRef: ElementRef<AngularMultiSelect>;

  membership_type=[]
  address_type=[]
  countries: any;
  states: any;
  cities: any;
  currentCuntryId: any;
  currentStateId: any;
  currentCityId: any;
  areas: any;
  currentAreaId: any;
  currentGalliMohallaId: any;
  galliMohalla: any=[];

  areadropdownSettings = {
    singleSelection: true,
    classes:"removeAllHide",
    text: "Select Area",
    addNewItemOnFilter:true,
    addNewButtonText:"Add Area",
    escapeToClose:true,
    enableSearchFilter: true,
    searchAutofocus: false,
    autoPosition: false,
    tagToBody:false,
    position: "bottom",
  };

  galiMohallaDropdownSettings = {
    singleSelection: true,
    classes:"removeAllHide",
    text: "Select Gali/Mohalla",
    addNewButtonText:"Add Gali/Mohalla",
    escapeToClose:true,
    enableSearchFilter: true,
    searchAutofocus: false,
    autoPosition: false,
    tagToBody:false,
    addNewItemOnFilter:true,
    position: "bottom",
  };

  constructor(
    private fb:FormBuilder,
    private memberService:MemberService,
    private masteService: MasterService,
  ) { 
    this.form=fb.group({
      form1:fb.group({
        member:new FormControl(''),
        member_type:new FormControl(''),
        member_no: new FormControl(''),
      }),
      form2:fb.group({
        first_name:new FormControl(''),
        middle_name:new FormControl(''),
        last_name:new FormControl(''),
        dob:new FormControl(''),
        age:new FormControl(''),
        relative:new FormControl(''),
        contacts:fb.array([]),
        email:new FormControl(''),
        website:new FormControl(''),
        gender:new FormControl(''),
        category:new FormControl(''),
        details:new FormControl(''),
        date_of_joining:new FormControl(''),
        married_status:new FormControl(''),
        data_of_married:new FormControl(''),
        fee_paid_upto:new FormControl(''),
        addresses:fb.array([]),
        profile:new FormControl(''),
      })
    })

    this.masteService.getMembershipType().pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      this.membership_type=data.membership_types;
      console.log(this.membership_type)
    })

    

    this.masteService.getAddressType().pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      this.address_type=data.address_type;
      console.log(this.address_type)
    })

    this.masteService.getCountry().pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      this.countries=data.countries

    })
  }
  

  ngOnInit(): void {
    this.addcontact()
    this.addaddress()
  }

  get form1():FormGroup{
    return this.form.get('form1') as FormGroup
  }
  get form2():FormGroup{
    return this.form.get('form2') as FormGroup
  }
  get contacts():FormArray{
    return this.form2.get("contacts") as FormArray
  }

  get addresses():FormArray{
    return this.form2.get("addresses") as FormArray
  }

  addcontact(contact?){
    this.contacts.push(this.newContact(contact))
  }

  removeContact(index){
    this.contacts.removeAt(index)
  }

  newContact(contact?):FormGroup{
    return this.fb.group({
      contact:new FormControl(contact?contact:'')
    })
  }

  removeAddress(index){
    this.addresses.removeAt(index)
  }

  addaddress(address?){
    this.addresses.push(this.newAddress(address))
  }

  newAddress(address?):FormGroup{
    return this.fb.group({
      address_type:new FormControl(address?.address_type?address.address_type:''),
      house_no:new FormControl(address?.house_no?address.house_no:''),
      gali_mohalla:new FormControl(address?.gali_mohalla?address.gali_mohalla:''),
      area:new FormControl(address?.area?address.area:''),
      landmark:new FormControl(address?.landmark?address.landmark:''),
      country:new FormControl(address?.country?address.country:''),
      state:new FormControl(address?.state?address.state:''),
      city:new FormControl(address?.city?address.city:''),
      pincode:new FormControl(address?.pincode?address.pincode:''),
    })
  }

  onCountrySelect(event){
    this.currentCuntryId=event.target.value;
   this.masteService.getState(this.currentCuntryId).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
     this.states=data.states
   }) 
  }

  onStateSelect(event){
    this.currentStateId=event.target.value
    this.masteService.getcities(this.currentCuntryId,this.currentStateId).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      this.cities=data.cities
    }) 
  }

  onCitySelect(event){
    this.currentCityId=event.target.value
    this.masteService.getArea(this.currentCuntryId,this.currentStateId,this.currentCityId).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      this.areas=data.areas
    })
  }

  onAreaSelect(event){
    console.log(event)
    this.currentAreaId=event.id
    this.masteService.getGalliMohalla(this.currentAreaId).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      this.galliMohalla=data.galli_mohalla;
    })
  }

  onGaliMohallaSelect(event){

  }

  addNewGaliMohalla(event,index,nativeElement){
    this.masteService.createGalliMohalla({
      name:event,
      areaId:this.currentAreaId
    }).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
        if(data.status==1){
            this.galliMohalla.push(data.data)
            console.log(this.galliMohalla)
            this.addresses.get(index.toString()).patchValue({
              gali_mohalla:[data.data]
            })
        }else{
          //TODO handle Error
        }
        //TODO close the dropdown dynamically
      // console.log(this.gmRef.dropdownListElem)
      //this.gmRef.triggerHandler({type:"keydown", which:27})
      //this.gmRef.nadispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
    })
  }
  addNewArea(event,index,nativeElement){
    this.masteService.createArea({
            name:event,
            countryId:this.currentCuntryId,
            stateId:this.currentStateId,
            cityId:this.currentCityId
    }).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
      if(data.status==1){
          this.areas.push(data.data)
          console.log(this.areas)
          this.addresses.get(index.toString()).patchValue({
            area:[data.data]
        })
      }else{
        //TODO handle Error
      }
        //TODO close the dropdown dynamically
      // console.log(this.gmRef.dropdownListElem)
      //this.gmRef.triggerHandler({type:"keydown", which:27})
      //this.gmRef.nadispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
    })
  }


  compareFn(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  onSubmit(){
    console.log(this.form)
    if(this.form.valid){
      this.memberService.postMember({
        ...this.form1.value,
        ...this.form2.value
      }).pipe(takeUntil(this.destroy)).subscribe((data:any)=>{
        if(data.status==1){

        }
      })
    }
  }

  onCancel(){
    this.cancel.emit(true);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
