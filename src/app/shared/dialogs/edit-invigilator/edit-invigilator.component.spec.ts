import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import {
  EditInvigilatorDialogComponent,
  NGRX,
  TAIGA_UI,
} from './edit-invigilator.component';

describe('EditInvigilatorDialogComponent', () => {
  let component: EditInvigilatorDialogComponent;
  let fixture: ComponentFixture<EditInvigilatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, NGRX, TAIGA_UI],
      providers: [
        APP_STORE_PROVIDER,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: {
              moduleId: null,
              moduleName: null,
              department: null,
              invigilator: {
                displayId: '',
                id: '',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditInvigilatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
