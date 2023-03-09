import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ENV } from '@esm/core';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { ExaminationCreateComponent } from './create.component';
import { NGRX, TAIGA_UI } from './create.module';

describe('CreateComponent', () => {
  let component: ExaminationCreateComponent;
  let fixture: ComponentFixture<ExaminationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ...NGRX,
        TAIGA_UI,
      ],
      declarations: [ExaminationCreateComponent],
      providers: [{ provide: APP_ENV, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should call `store.create`', () => {
      const spy = spyOn(component['store'], 'create');
      const expectedStartAt = new Date(2023, 0, 1, 7, 0, 0, 0);
      const expectEndAt = new Date(2023, 1, 1, 7, 0, 0, 0);

      component.form.patchValue({
        description: 'Mock description',
        displayId: 'Mock ID',
        name: 'Mock name',
        expectedDateRange: new TuiDayRange(
          new TuiDay(2023, 0, 1),
          new TuiDay(2023, 1, 1)
        ),
      });

      component.onSubmit();

      expect(spy).toHaveBeenCalledOnceWith({
        name: 'Mock name',
        displayId: 'Mock ID',
        description: 'Mock description',
        expectStartAt: expectedStartAt,
        expectEndAt: expectEndAt,
      });
    });
  });
});
