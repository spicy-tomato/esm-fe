import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StringHelper, requiredFactory } from '@esm/cdk';
import { ChangePasswordRequest } from '@esm/data';
import {
  differentControlValueValidator,
  sameControlValueValidator,
} from '@esm/shared/validations';
import { LetModule } from '@ngrx/component';
import { TuiValidationError } from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiErrorModule,
  TuiNotification,
} from '@taiga-ui/core';
import {
  TUI_VALIDATION_ERRORS,
  TuiFieldErrorPipeModule,
  TuiInputPasswordModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { of, switchMap } from 'rxjs';
import { SettingsChangePasswordStore } from './change-password.store';

const TAIGA_UI = [
  TuiIslandModule,
  TuiInputPasswordModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiButtonModule,
];

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LetModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    ...TAIGA_UI,
  ],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        minlength: (): string => 'Mật khẩu cần có tối thiểu 6 ký tự',
        required: requiredFactory,
      },
    },
    SettingsChangePasswordStore,
  ],
})
export class SettingsChangePasswordComponent implements OnInit {
  // INJECTS
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(SettingsChangePasswordStore);
  private readonly alertService = inject(TuiAlertService);

  // PUBLIC PROPERTIES
  readonly status$ = this.store.status$;
  readonly userTitle$ = this.store.userTitle$;
  form!: FormGroup;

  // GETTERS
  private get password(): FormControl {
    return this.form.controls['password'] as FormControl;
  }

  get newPassword(): FormControl {
    return this.form.controls['newPassword'] as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.form.controls['confirmPassword'] as FormControl;
  }

  // LIFECYCLE
  ngOnInit(): void {
    this.initForm();
    this.handleStatusChange();
  }

  // PUBLIC METHODS
  onSubmit(): void {
    if (this.form.valid) {
      const password = this.password.value as string;
      const newPassword = this.newPassword.value as string;

      const form: ChangePasswordRequest = {
        password: StringHelper.md5(password),
        newPassword: StringHelper.md5(newPassword),
      };
      this.store.change(form);
    }
  }

  // PRIVATE METHODS
  private initForm(): void {
    this.form = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      token: ['', Validators.required],
    });

    this.newPassword.addValidators(
      sameControlValueValidator(this.password, {
        error: new TuiValidationError(
          'Mật khẩu mới không được trùng mật khẩu cũ!'
        ),
      })
    );

    this.confirmPassword.addValidators(
      differentControlValueValidator(this.newPassword, {
        error: new TuiValidationError(
          'Xác nhận mật khẩu không khớp với mật khẩu mới!'
        ),
      })
    );
  }

  private handleStatusChange(): void {
    this.status$
      .pipe(
        switchMap((status) => {
          if (status === 'success') {
            this.form.disable();
            return this.alertService.open('Thay đổi mật khẩu thành công!', {
              status: TuiNotification.Success,
            });
          }

          if (status === 'error') {
            this.password.setErrors(
              new TuiValidationError(
                'Mật khẩu không chính xác, vui lòng thử lại!'
              )
            );
          }

          return of({});
        })
      )
      .subscribe();
  }
}
