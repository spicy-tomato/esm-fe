import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER } from '@esm/cdk';
import { ExaminationStatus } from '@esm/data';
import { MinimumExaminationStatusDirective } from './minimum-examination-status.directive';

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
      providers: [APP_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });
});
