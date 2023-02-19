import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_ENV } from '@esm/core';
import { provideMockStore } from '@ngrx/store/testing';
import { ExaminationDataComponent } from './data.component';
import { NGRX, TAIGA_UI } from './data.module';

describe('DataComponent', () => {
  let component: ExaminationDataComponent;
  let fixture: ComponentFixture<ExaminationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ...NGRX, ...TAIGA_UI],
      declarations: [ExaminationDataComponent],
      providers: [provideMockStore({}), { provide: APP_ENV, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(ExaminationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
