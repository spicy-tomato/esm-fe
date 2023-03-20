import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { APP_ENV, ExamMethodPipeModule } from '@esm/core';
import { ExamMethod } from '@esm/data';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { EditShiftReportComponent } from './edit-shift-report.component';
import { NGRX, TAIGA_UI } from './edit-shift-report.module';

describe('EditShiftReportComponent', () => {
  let component: EditShiftReportComponent;
  let fixture: ComponentFixture<EditShiftReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormsModule,
        ExamMethodPipeModule,
        ...NGRX,
        ...TAIGA_UI,
      ],
      declarations: [EditShiftReportComponent],
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
            data: {
              handedOverUserId: null,
              report: '',
              shiftGroup: {
                module: {
                  displayId: 'mock-module-id',
                  name: 'Mock module name',
                  method: ExamMethod.Write,
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditShiftReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
