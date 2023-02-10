import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { slideUp, StringHelper } from '@esm/core';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { tap } from 'rxjs';
import { LoginStore } from './login.store';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [slideUp],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginStore, TuiDestroyService],
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
