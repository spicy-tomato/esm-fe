import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSelector } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { PermissionDirective } from './permission.directive';

@Component({
  template: '<div *esmPermission="permission"></div>',
})
class HostComponent {
  permission = 1;
}

describe('PermissionDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermissionDirective, HostComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });
});
