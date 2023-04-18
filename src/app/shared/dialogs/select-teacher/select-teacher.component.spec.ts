import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_ENV } from '@esm/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { SelectTeacherDialogComponent } from './select-teacher.component';

fdescribe('SelectTeacherComponent', () => {
  let component: SelectTeacherDialogComponent;
  let fixture: ComponentFixture<SelectTeacherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: APP_ENV, useValue: {} },
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTeacherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
