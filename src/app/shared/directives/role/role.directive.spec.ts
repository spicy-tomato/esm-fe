import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER } from '@esm/cdk';
import { RoleDirective } from './role.directive';

@Component({
  template: '<div *esmRole="role"></div>',
})
class HostComponent {
  role = '';
}

describe('RoleDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleDirective],
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
