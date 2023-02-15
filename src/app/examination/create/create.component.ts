import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { TuiDayRange } from '@taiga-ui/cdk';
import { CreateStore } from './create.store';

@Component({
  selector: 'esm-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateStore],
})
export class ExaminationCreateComponent {
  // PUBLIC PROPERTIES
  readonly form = this.fb.group({
    name: ['', Validators.required],
    displayId: [''],
    description: [''],
    expectedDateRange: [null as TuiDayRange | null],
  });
  readonly status$ = this.store.status$;

  // CONSTRUCTORS
  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly store: CreateStore
  ) {}

  // PUBLIC METHODS
  onSubmit(): void {
    const { expectedDateRange, ...rest } = this.form.getRawValue();
    this.store.create({
      ...rest,
      expectStartAt: expectedDateRange?.from.toUtcNativeDate() ?? null,
      expectEndAt: expectedDateRange?.to.toUtcNativeDate() ?? null,
    });
  }
}
