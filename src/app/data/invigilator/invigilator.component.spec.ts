import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataInvigilatorComponent } from './invigilator.component';

describe('DataInvigilatorComponent', () => {
  let component: DataInvigilatorComponent;
  let fixture: ComponentFixture<DataInvigilatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataInvigilatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataInvigilatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
