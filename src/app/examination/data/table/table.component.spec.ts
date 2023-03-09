import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ExaminationDataTemporaryTableComponent } from './table.component';
import { NGRX, TAIGA_UI } from './table.module';

describe('ExaminationDataTemporaryTableComponent', () => {
  let component: ExaminationDataTemporaryTableComponent;
  let fixture: ComponentFixture<ExaminationDataTemporaryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ScrollingModule,
        ...NGRX,
        ...TAIGA_UI,
      ],
      declarations: [ExaminationDataTemporaryTableComponent],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDataTemporaryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call initial methods', () => {
      const handleSpy = spyOn<any>(component, 'handleDataChanges');
      const storeSpy = spyOn(component['store'], 'getData');

      component.ngOnInit();

      expect(handleSpy).toHaveBeenCalled();
      expect(storeSpy).toHaveBeenCalled();
    });
  });
});
