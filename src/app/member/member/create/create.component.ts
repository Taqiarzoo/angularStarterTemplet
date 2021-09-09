import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form:FormGroup
  constructor(
    private fb:FormBuilder,
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
        contact:fb.array([]),
        email:new FormControl(''),
        website:new FormControl(''),
        gender:new FormControl(''),
        category:new FormControl(''),
        details:new FormControl(''),
        date_of_joining:new FormControl(''),
        married_status:new FormControl(''),
        data_of_married:new FormControl(''),
        fee_paid_upto:new FormControl(''),
        address:fb.array([]),
        profile:new FormControl(''),
      })
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
  get contact():FormArray{
    return this.form2.get("contact") as FormArray
  }

  get address():FormArray{
    return this.form2.get("address") as FormArray
  }

  addcontact(contact?){
    this.contact.push(this.newContact(contact))
  }

  removeContact(index){
    this.contact.removeAt(index)
  }

  newContact(contact?):FormGroup{
    return this.fb.group({
      contact:new FormControl(contact?contact:'')
    })
  }

  removeAddress(index){
    this.address.removeAt(index)
  }

  addaddress(address?){
    this.address.push(this.newAddress(address))
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


  compareFn(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
