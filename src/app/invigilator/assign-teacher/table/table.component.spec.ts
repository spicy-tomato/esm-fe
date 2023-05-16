import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { provideComponentStore } from '@ngrx/component-store';
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
      imports: [TESTING_COMMON_IMPORTS, TAIGA_UI],
      providers: [
        APP_STORE_PROVIDER,
        provideComponentStore(InvigilatorAssignTeacherStore),
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
