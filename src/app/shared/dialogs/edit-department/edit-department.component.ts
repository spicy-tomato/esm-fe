import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ObservableHelper, StringifyHelper } from '@esm/cdk';
import { DepartmentSummary } from '@esm/data';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiNotification,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { EditDepartmentDialogStore } from './edit-department.store';

@Component({
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditDepartmentDialogStore],
})
export class EditDepartmentDialogComponent implements OnInit {
  form = this.fb.group({
    displayId: [this.context.data?.displayId || '', Validators.required],
    name: [this.context.data?.name || '', Validators.required],
    facultyId: [this.context.data?.faculty?.id || '', Validators.required],
  });
  readonly isEditDialog = this.context.data !== undefined;
  readonly faculties$ = this.store.faculties$;
  readonly status$ = this.store.status$;
  readonly errors$ = this.store.errors$;
  readonly facultyStringify = StringifyHelper.idName;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      boolean,
      DepartmentSummary | undefined
    >,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private readonly store: EditDepartmentDialogStore
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
            ? 'C???p nh???t th??ng tin th??nh c??ng!'
            : 'Th??m khoa th??nh c??ng!';
          this.alertService
            .open(message, { status: TuiNotification.Success })
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
