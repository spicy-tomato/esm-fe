import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataWrapperComponent } from './wrapper.component';

describe('WrapperComponent', () => {
  let component: DataWrapperComponent;
  let fixture: ComponentFixture<DataWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DataWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
