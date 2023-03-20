import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiDayRange } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiIslandModule,
} from '@taiga-ui/kit';
import { CreateStore } from './create.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiInputDateRangeModule,
  TuiInputModule,
  TuiIslandModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
];

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
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
