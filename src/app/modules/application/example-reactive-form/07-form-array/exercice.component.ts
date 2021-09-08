import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './exercice.component.html',
  styleUrls: ['./exercice.component.css'],
})
export class ExerciceComponent implements OnInit {
  exampleForm: FormGroup;

  

  constructor(private fb: FormBuilder) { 
    this.exampleForm = this.fb.group({
      name: [''],
      releaseDate: [''],
      characters: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.exampleForm.patchValue({
      name: 'Avengers: Endgame',
      releaseDate: '26/04/2019',    
    });
    this.addCharacter()
  }

  addCharacter(): void {
    this.characters.push(this.addconrtols({}));
  }

  get characters(): FormArray {
    return this.exampleForm.get('characters') as FormArray;
  }

  addconrtols(array:any):FormGroup{
    return this.fb.group({
      name:new FormControl('Hussain'),
      fatherName:new FormControl('Mohd Sadiq'),
      motherName:new FormControl("mother Name")
    })
  }

  updateControls(): void {
    this.exampleForm.patchValue({
      name: 'Avengers: Endgame patchValue',
      releaseDate: '26/04/2019 patchValue',
    });
  }

  resetControls(): void {
    this.exampleForm.patchValue({
      name: null,
      releaseDate: null,
    });
  }

}
