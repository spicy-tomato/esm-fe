import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { SafeExaminationDataComponent } from './safe-examination-data.component';

describe('SafeExaminationDataComponent', () => {
  let component: SafeExaminationDataComponent;
  let fixture: ComponentFixture<SafeExaminationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeExaminationDataComponent],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SafeExaminationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
