import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorAtertComponent } from './error-atert.component';

describe('ErrorAtertComponent', () => {
  let component: ErrorAtertComponent;
  let fixture: ComponentFixture<ErrorAtertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorAtertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorAtertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
