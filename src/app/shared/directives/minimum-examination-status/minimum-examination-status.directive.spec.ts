import { Component } from '@angular/core';
import { MinimumExaminationStatusDirective } from './minimum-examination-status.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ExaminationStatus } from '@esm/data';

@Component({
  template: '<div *esmMinimumExaminationStatus="status"></div>',
})
class HostComponent {
  status = ExaminationStatus.Idle;
}

describe('MinimumExaminationStatusDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimumExaminationStatusDirective],
      declarations: [HostComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });
});
