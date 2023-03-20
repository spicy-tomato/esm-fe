import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ConfirmDialogComponent, NGRX, TAIGA_UI } from './confirm.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...NGRX, ...TAIGA_UI],
      providers: [
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: {
            data: {
              moduleId: null,
              moduleName: null,
              department: null,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
