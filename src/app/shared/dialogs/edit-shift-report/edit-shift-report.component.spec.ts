import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { ExamMethodPipe } from '@esm/core';
import { ExamMethod, GetHandoverDataResponseItem } from '@esm/data';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  EditShiftReportDialogComponent,
  NGRX,
  TAIGA_UI,
} from './edit-shift-report.component';

describe('EditShiftReportDialogComponent', () => {
  let component: EditShiftReportDialogComponent;
  let fixture: ComponentFixture<EditShiftReportDialogComponent>;
  const defaultContext: GetHandoverDataResponseItem = {
    handedOverUserId: null,
    report: '',
    id: '',
    invigilatorShift: [
      {
        id: '',
        orderIndex: 1,
        invigilator: null,
      },
    ],
    room: {
      displayId: '',
    },
    shiftGroup: {
      id: '',
      method: ExamMethod.Oral,
      startAt: new Date(),
      shift: null,
      departmentAssign: false,
      module: {
        displayId: 'mock-module-id',
        name: 'Mock module name',
        faculty: {
          displayId: null,
          name: '',
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, ExamMethodPipe, NGRX, TAIGA_UI],
      providers: [
        APP_STORE_PROVIDER,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: defaultContext,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditShiftReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
