import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  ExaminationHandoverComponent,
  NGRX,
  TAIGA_UI,
} from './handover.component';

describe('HandoverComponent', () => {
  let component: ExaminationHandoverComponent;
  let fixture: ComponentFixture<ExaminationHandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, NGRX, TAIGA_UI],
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
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationHandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
