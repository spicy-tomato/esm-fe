import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ExaminationHandoverComponent } from './handover.component';
import { NGRX, TAIGA_UI } from './handover.module';

describe('HandoverComponent', () => {
  let component: ExaminationHandoverComponent;
  let fixture: ComponentFixture<ExaminationHandoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ...NGRX,
        ...TAIGA_UI,
      ],
      declarations: [ExaminationHandoverComponent],
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
