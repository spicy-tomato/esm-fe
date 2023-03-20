import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StringHelper } from '@esm/cdk';
import { slideUp } from '@esm/core';
import { LetModule } from '@ngrx/component';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiHintModule,
  TuiLinkModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiInputPasswordModule,
} from '@taiga-ui/kit';
import { tap } from 'rxjs';
import { LoginStore } from './login.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiCheckboxLabeledModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiHintModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiLinkModule,
  TuiTextfieldControllerModule,
];

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
  providers: [LoginStore, TuiDestroyService],
  animations: [slideUp],
})
export class LoginComponent implements OnInit {
  // PUBLIC PROPERTIES
  readonly form = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    // TODO: Remove below
    validator: [''],
  });
  readonly status$ = this.store.status$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly store: LoginStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleStatusChange();
  }

  // PUBLIC METHODS
  login(): void {
    if (this.form.valid) {
      const { validator, ...registerForm } = this.form.getRawValue();
      this.store.login({
        ...registerForm,
        password: StringHelper.md5(registerForm.password),
      });
    }
  }

  // PRIVATE METHODS
  private handleStatusChange(): void {
    this.status$
      .pipe(
        tap((status) => {
          if (status === 'error') {
            this.form.setErrors({ validator: 'Username or password is wrong' });
          }
        })
      )
      .subscribe();
  }
}
