import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  ExaminationDataFinalComponent,
  NGRX,
  TAIGA_UI,
} from './final.component';

describe('ExaminationDataFinalComponent', () => {
  let component: ExaminationDataFinalComponent;
  let fixture: ComponentFixture<ExaminationDataFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, ScrollingModule, NGRX, TAIGA_UI],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDataFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call initial methods', () => {
      const storeSpy = spyOn(component['store'], 'getData');
      component.ngOnInit();
      expect(storeSpy).toHaveBeenCalled();
    });
  });
});
