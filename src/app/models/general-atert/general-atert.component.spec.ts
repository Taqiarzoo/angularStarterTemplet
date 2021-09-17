import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAtertComponent } from './general-atert.component';

describe('GeneralAtertComponent', () => {
  let component: GeneralAtertComponent;
  let fixture: ComponentFixture<GeneralAtertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralAtertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAtertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
