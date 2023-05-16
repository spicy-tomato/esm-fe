import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { LetModule } from '@ngrx/component';
import { provideMockStore } from '@ngrx/store/testing';
import {
  DiagramAllModule,
  DiagramModule,
} from '@syncfusion/ej2-angular-diagrams';
import { environment } from 'src/environments/environment';
import { ExaminationProcessComponent, TAIGA_UI } from './process.component';
import { ExaminationProcessStore } from './process.store';

describe('ExaminationProcessComponent', () => {
  let component: ExaminationProcessComponent;
  let fixture: ComponentFixture<ExaminationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TESTING_COMMON_IMPORTS,
        DiagramModule,
        DiagramAllModule,
        LetModule,
        TAIGA_UI,
      ],
      providers: [
        ExaminationProcessStore,
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: environment },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
