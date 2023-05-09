import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideComponentStore } from '@ngrx/component-store';
import { provideMockStore } from '@ngrx/store/testing';
import { InvigilatorAssignTeacherStore } from '../assign-teacher.store';
import {
  InvigilatorAssignTeacherTableComponent,
  TAIGA_UI,
} from './table.component';

describe('InvigilatorAssignTeacherTableComponent', () => {
  let component: InvigilatorAssignTeacherTableComponent;
  let fixture: ComponentFixture<InvigilatorAssignTeacherTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ...TAIGA_UI],
      providers: [
        provideComponentStore(InvigilatorAssignTeacherStore),
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignTeacherTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
