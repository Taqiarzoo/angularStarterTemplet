import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadSelectComponent } from './head-select.component';

describe('HeadSelectComponent', () => {
  let component: HeadSelectComponent;
  let fixture: ComponentFixture<HeadSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
