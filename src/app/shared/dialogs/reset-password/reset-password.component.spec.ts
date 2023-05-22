import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { ResetPasswordDialogComponent } from './reset-password.component';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

describe('ResetPasswordDialogComponent', () => {
  let component: ResetPasswordDialogComponent;
  let fixture: ComponentFixture<ResetPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [
        APP_STORE_PROVIDER,
        {
          provide: POLYMORPHEUS_CONTEXT,
          useValue: { data: '' },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
