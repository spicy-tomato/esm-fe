import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataDepartmentComponent } from './department.component';

describe('DataDepartmentComponent', () => {
  let component: DataDepartmentComponent;
  let fixture: ComponentFixture<DataDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataDepartmentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
