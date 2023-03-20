import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
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
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });
});
