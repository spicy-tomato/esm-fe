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
import { FacultyWithDepartments, UserSummary } from '@esm/data';
import { LetModule } from '@ngrx/component';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';
import {
  TuiAlertService,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogContext,
  TuiErrorModule,
  TuiLabelModule,
  TuiNotification,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiRadioLabeledModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { EditInvigilatorDialogStore } from './edit-invigilator.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiErrorModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiLabelModule,
  TuiRadioLabeledModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

@Component({
  templateUrl: './edit-invigilator.component.html',
  styleUrls: ['./edit-invigilator.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
  providers: [EditInvigilatorDialogStore],
})
export class EditInvigilatorDialogComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly alertService = inject(TuiAlertService);
  private readonly store = inject(EditInvigilatorDialogStore);
  private readonly context = inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
    boolean,
    UserSummary | undefined
  >;

  // PUBLIC PROPERTIES
  readonly form = this.fb.group({
    invigilatorId: [
      this.context.data?.invigilatorId || '',
      Validators.required,
    ],
    fullName: [this.context.data?.fullName || '', Validators.required],
    email: [
      this.context.data?.email || '',
      [Validators.required, Validators.email],
    ],
    isMale: [this.context.data?.isMale || true, Validators.required],
    departmentId: [
      this.context.data?.department?.id || '',
      Validators.required,
    ],
  });
  readonly isEditDialog = this.context.data !== undefined;
  readonly faculties$ = this.store.faculties$;
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
    const request = this.form.getRawValue();

    if (this.isEditDialog) {
      this.store.update({ id: this.context.data!.id, request });
    } else {
      this.store.create({
        departmentId: request.departmentId,
        request,
      });
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
