import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ObservableHelper } from '@esm/cdk';
import { FacultyWithDepartments, UserSummary } from '@esm/data';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiNotification,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { EditInvigilatorDialogStore } from './edit-invigilator.store';

@Component({
  templateUrl: './edit-invigilator.component.html',
  styleUrls: ['./edit-invigilator.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditInvigilatorDialogStore],
})
export class EditInvigilatorDialogComponent implements OnInit {
  form = this.fb.group({
    displayId: [
      this.context.data?.invigilator.displayId || '',
      Validators.required,
    ],
    fullName: [this.context.data?.fullName || '', Validators.required],
    email: [
      this.context.data?.email || '',
      [Validators.required, Validators.email],
    ],
    isMale: [this.context.data?.isMale || true, Validators.required],
    departmentId: [
      this.context.data?.department?.faculty?.id || '',
      Validators.required,
    ],
  });
  readonly isEditDialog = this.context.data !== undefined;
  readonly faculties$ = this.store.faculties$;
  readonly status$ = this.store.status$;
  readonly errors$ = this.store.errors$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      boolean,
      UserSummary | undefined
    >,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private readonly store: EditInvigilatorDialogStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleCreateSuccess();
    this.handleCreateFailed();
  }

  // PUBLIC METHODS
  onFinish(): void {
    this.form.markAllAsTouched();
    const { departmentId, ...request } = this.form.getRawValue();

    if (this.isEditDialog) {
      // this.store.update({ id: this.context.data!.id, request: formValue });
    } else {
      this.store.create({ departmentId, request });
    }
  }

  @tuiPure
  departmentStringify(
    items: FacultyWithDepartments[]
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items.reduce((acc, curr) => {
        acc = [
          ...acc,
          ...curr.departments.map(
            ({ id, name }) => [id, name] as [string, string]
          ),
        ];
        return acc;
      }, [] as [string, string][])
    );

    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) || '';
  }

  // PRIVATE METHODS
  private handleCreateSuccess(): void {
    this.status$
      .pipe(
        filter((s) => s === 'success'),
        tap(() => {
          const message = this.isEditDialog
            ? 'Cập nhật thông tin thành công!'
            : 'Thêm CBCT công!';
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
