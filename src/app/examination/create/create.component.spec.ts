import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ENV } from '@esm/core';
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
});
