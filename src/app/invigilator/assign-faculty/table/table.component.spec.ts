import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { InvigilatorAssignFacultyStore } from '../assign-faculty.store';
import { InvigilatorAssignFacultyTableComponent } from './table.component';

describe('InvigilatorAssignFacultyTableComponent', () => {
  let component: InvigilatorAssignFacultyTableComponent;
  let fixture: ComponentFixture<InvigilatorAssignFacultyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
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

    fixture = TestBed.createComponent(InvigilatorAssignFacultyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
