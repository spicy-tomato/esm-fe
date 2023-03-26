import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { APP_ENV, ExamMethodPipe } from '@esm/core';
import { ExamMethod, GetHandoverDataResponseItem } from '@esm/data';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
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
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormsModule,
        ExamMethodPipe,
        ...NGRX,
        ...TAIGA_UI,
      ],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
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
