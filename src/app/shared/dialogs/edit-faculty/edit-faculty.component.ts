import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ObservableHelper } from '@esm/cdk';
import { FacultySummary } from '@esm/data';
import { LetModule } from '@ngrx/component';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiDialogContext,
  TuiErrorModule,
  TuiLabelModule,
  TuiNotification,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { EditFacultyDialogStore } from './edit-faculty.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiLabelModule,
  TuiTextfieldControllerModule,
];

@Component({
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
  providers: [EditFacultyDialogStore],
})
export class EditFacultyDialogComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly store = inject(EditFacultyDialogStore);
  private readonly alertService = inject(TuiAlertService);
  private readonly context = inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
    boolean,
    FacultySummary | undefined
  >;

  // PUBLIC PROPERTIES
  form = this.fb.group({
    displayId: [this.context.data?.displayId ?? '', Validators.required],
    name: [this.context.data?.name ?? '', Validators.required],
  });
  readonly isEditDialog = this.context.data !== undefined;
  readonly status$ = this.store.status$;
  readonly errors$ = this.store.errors$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleCreateSuccess();
    this.handleCreateFailed();
  }

  // PUBLIC METHODS
  onFinish(): void {
    this.form.markAllAsTouched();
    const formValue = this.form.getRawValue();
    if (this.isEditDialog) {
      this.store.update({ id: this.context.data!.id, request: formValue });
    } else {
      this.store.create(formValue);
    }
  }

  // PRIVATE METHODS
  private handleCreateSuccess(): void {
    this.status$
      .pipe(
        filter((s) => s === 'success'),
        tap(() => {
          const message = this.isEditDialog
            ? 'Cập nhật thông tin thành công!'
            : 'Thêm khoa thành công!';
          this.alertService
            .open(message, {
              status: TuiNotification.Success,
            })
            .subscribe();
          this.context.completeWith(true);
        })
      )
      .subscribe();
  }

  private handleCreateFailed(): void {
    this.errors$
      .pipe(
        ObservableHelper.filterNullish(),
        tap((errors) => {
          errors.forEach((e) => {
            if (!e.property) {
              return;
            }

            this.form.get(e.property)?.setErrors({ duplicated: e.message });
          });
        })
      )
      .subscribe();
  }
}
