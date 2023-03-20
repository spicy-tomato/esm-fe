import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ExaminationDataComponent, NGRX } from './data.component';

describe('DataComponent', () => {
  let component: ExaminationDataComponent;
  let fixture: ComponentFixture<ExaminationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ...NGRX],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
