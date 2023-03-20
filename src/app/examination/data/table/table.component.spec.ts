import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  ExaminationDataTableComponent,
  NGRX,
  TAIGA_UI,
} from './table.component';

describe('ExaminationDataTableComponent', () => {
  let component: ExaminationDataTableComponent;
  let fixture: ComponentFixture<ExaminationDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ScrollingModule, ...NGRX, ...TAIGA_UI],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDataTableComponent);
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
