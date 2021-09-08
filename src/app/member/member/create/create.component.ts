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
      id:new FormControl(),
      member:new FormControl(),
      member_type:new FormControl(),
      member_no:new FormControl(),
      name:new FormControl(),
      middle_name:new FormControl(),
      last_name:new FormControl(),
      contact:fb.array([]),
      address:fb.array([])
    })
  }
  

  ngOnInit(): void {
    this.addcontact()
    this.addaddress()
  }

  get contact():FormArray{
    return this.form.get("contact") as FormArray
  }

  get address():FormArray{
    return this.form.get("address") as FormArray
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
      address_type:new FormControl(address?address:''),
      address:new FormControl(address?address:''),
      area:new FormControl(address?address:''),
      house_no:new FormControl(address?address:''),
      galli_muhala:new FormControl(address?address:''),
      colony:new FormControl(address?address:''),
      country:new FormControl(address?address:''),
      state:new FormControl(address?address:''),
      city:new FormControl(address?address:''),
      pincode:new FormControl(address?address:''),
      landmark:new FormControl(address?address:''),
    })
  }


  compareFn(o1, o2) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

}
