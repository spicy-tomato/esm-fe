import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { InvigilatorAssignFacultyStore } from '../assign-faculty.store';
import { InvigilatorAssignFacultyHeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InvigilatorAssignFacultyHeaderComponent', () => {
  let component: InvigilatorAssignFacultyHeaderComponent;
  let fixture: ComponentFixture<InvigilatorAssignFacultyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        InvigilatorAssignFacultyStore,
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignFacultyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
