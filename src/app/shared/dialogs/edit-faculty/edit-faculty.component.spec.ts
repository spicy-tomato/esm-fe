import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFacultyDialogComponent } from './edit-faculty.component';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { NGRX, TAIGA_UI } from './edit-faculty.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_ENV } from '@esm/core';

describe('EditFacultyDialogComponent', () => {
  let component: EditFacultyDialogComponent;
  let fixture: ComponentFixture<EditFacultyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ...NGRX,
        ...TAIGA_UI,
      ],
      declarations: [EditFacultyDialogComponent],
      providers: [
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

    fixture = TestBed.createComponent(EditFacultyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
