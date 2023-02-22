import { ComponentFixture, TestBed } from '@angular/core/testing';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataFacultyComponent } from './faculty.component';
import { NGRX, TAIGA_UI } from './faculty.module';

describe('DataFacultyComponent', () => {
  let component: DataFacultyComponent;
  let fixture: ComponentFixture<DataFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...NGRX, ...TAIGA_UI],
      declarations: [DataFacultyComponent],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
