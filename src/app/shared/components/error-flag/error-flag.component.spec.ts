import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorFlagComponent } from './error-flag.component';

describe('ErrorFlagComponent', () => {
  let component: ErrorFlagComponent;
  let fixture: ComponentFixture<ErrorFlagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorFlagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
