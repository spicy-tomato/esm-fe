import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ObservableHelper } from '@esm/cdk';
import { FacultySummary } from '@esm/data';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiNotification,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { EditFacultyDialogStore } from './edit-faculty.store';

@Component({
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditFacultyDialogStore],
})
export class EditFacultyDialogComponent implements OnInit {
  form = this.fb.group({
    displayId: [this.context.data?.displayId || '', Validators.required],
    name: [this.context.data?.name || '', Validators.required],
  });
  readonly isEditDialog = this.context.data !== undefined;
  readonly status$ = this.store.status$;
  readonly errors$ = this.store.errors$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      boolean,
      FacultySummary | undefined
    >,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private readonly store: EditFacultyDialogStore
  ) {}

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
