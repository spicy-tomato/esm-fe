import { ComponentFixture, TestBed } from '@angular/core/testing';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataDepartmentComponent } from './department.component';
import { NGRX, TAIGA_UI } from './department.module';

describe('DataDepartmentComponent', () => {
  let component: DataDepartmentComponent;
  let fixture: ComponentFixture<DataDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...NGRX, ...TAIGA_UI],
      declarations: [DataDepartmentComponent],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
