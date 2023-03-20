import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  EditDepartmentDialogComponent,
  NGRX,
  TAIGA_UI,
} from './edit-department.component';

describe('EditDepartmentDialogComponent', () => {
  let component: EditDepartmentDialogComponent;
  let fixture: ComponentFixture<EditDepartmentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
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
            data: {
              moduleId: null,
              moduleName: null,
              department: null,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDepartmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
