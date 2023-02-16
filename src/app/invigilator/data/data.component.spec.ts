import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvigilatorDataComponent } from './data.component';

describe('DataComponent', () => {
  let component: InvigilatorDataComponent;
  let fixture: ComponentFixture<InvigilatorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvigilatorDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
