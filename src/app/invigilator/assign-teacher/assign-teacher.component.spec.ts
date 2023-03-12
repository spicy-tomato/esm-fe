import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { InvigilatorAssignTeacherComponent } from './assign-teacher.component';
import { NGRX, TAIGA_UI } from './assign-teacher.module';

describe('AssignTeacherComponent', () => {
  let component: InvigilatorAssignTeacherComponent;
  let fixture: ComponentFixture<InvigilatorAssignTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ...NGRX,
        ...TAIGA_UI,
      ],
      declarations: [InvigilatorAssignTeacherComponent],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should handle build form', () => {
      const buildFormSpy = spyOn<any>(component, 'handleBuildForm');
      component.ngOnInit();
      expect(buildFormSpy).toHaveBeenCalled();
    });
    it('should get data', () => {
      const getDataSpy = spyOn(component['store'], 'getData');
      const getInvigilatorsDataSpy = spyOn(
        component['store'],
        'getInvigilatorsData'
      );
      component.ngOnInit();
      expect(getDataSpy).toHaveBeenCalled();
      expect(getInvigilatorsDataSpy).toHaveBeenCalled();
    });
  });

  describe('invigilatorMatcher', () => {
    it('should returns `true`', () => {
      const expected = true;
      const actual = component.invigilatorMatcher(
        {
          createdAt: new Date(),
          department: {
            id: 'mock-id-faculty',
            name: 'Mock faculty name',
            faculty: null,
            displayId: 'mock-id',
          },
          email: 'mock@email.com',
          fullName: 'Mock name',
          id: 'mock-id',
          invigilatorId: 'mock-id',
          isMale: false,
          role: 'ExaminationDepartmentHead',
        },
        'mock-id-faculty'
      );
      expect(actual).toEqual(expected);
    });
    it('should returns `false`', () => {
      const expected = false;
      const actual = component.invigilatorMatcher(
        {
          createdAt: new Date(),
          department: null,
          email: 'mock@email.com',
          fullName: 'Mock name',
          id: 'mock-id',
          invigilatorId: 'mock-id',
          isMale: false,
          role: 'ExaminationDepartmentHead',
        },
        'mock-id-faculty'
      );
      expect(actual).toEqual(expected);
    });
  });
});
