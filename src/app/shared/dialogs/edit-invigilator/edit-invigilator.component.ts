import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
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
  TUI_TEXTFIELD_APPEARANCE_DIRECTIVE,
  TuiAlertService,
  TuiAppearance,
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogContext,
  TuiErrorModule,
  TuiLabelModule,
  TuiNotification,
  TuiTextfieldAppearanceDirective,
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

type UserTemplate = {
  invigilatorName: string;
  departmentId: string;
};

type FormType = {
  invigilatorId: FormControl<string>;
  fullName: FormControl<string>;
  email: FormControl<string>;
  isMale: FormControl<boolean>;
  departmentId: FormControl<string>;
  phoneNumber: FormControl<string>;
};

@Component({
  templateUrl: './edit-invigilator.component.html',
  styleUrls: ['./edit-invigilator.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
  providers: [
    {
      provide: TUI_TEXTFIELD_APPEARANCE_DIRECTIVE,
      useFactory: (): TuiTextfieldAppearanceDirective => {
        const directive = new TuiTextfieldAppearanceDirective();
        directive.appearance = TuiAppearance.Textfield;
        return directive;
      },
    },
    EditInvigilatorDialogStore,
  ],
})
export class EditInvigilatorDialogComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly alertService = inject(TuiAlertService);
  private readonly store = inject(EditInvigilatorDialogStore);
  private readonly context = inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
    UserSummary,
    UserSummary | UserTemplate | undefined
  >;

  // PUBLIC PROPERTIES
  readonly isFillCreateDialog =
    this.context.data &&
    EditInvigilatorDialogComponent.isTemporaryInvigilator(this.context.data);
  readonly isEditDialog =
    this.context.data !== undefined && !this.isFillCreateDialog;
  readonly form = this.buildForm();
  readonly faculties$ = this.store.faculties$;
  readonly status$ = this.store.status$;
  readonly errors$ = this.store.errors$;
  readonly responseData$ = this.store.responseData$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleStatusChanges();
    this.handleErrorChanges();
    this.handleSuccessSubmit();
  }

  // PUBLIC METHODS
  onSubmit(): void {
    this.form.markAllAsTouched();
    const request = this.form.getRawValue();
    this.form.disable();

    if (!this.isEditDialog) {
      this.store.create({
        departmentId: request.departmentId,
        request,
      });
      return;
    }

    const contextData = this.context.data!;
    if (!('id' in contextData)) {
      throw Error(
        'EditInvigilatorDialogComponent is edit dialog, but contextData.id is undefined'
      );
    }

    this.store.update({ id: contextData.id, request });
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
      map.get($implicit) ?? '';
  }

  // PRIVATE METHODS
  private handleStatusChanges(): void {
    this.status$
      .pipe(
        filter((s) => s === 'error'),
        tap(() => this.form.enable())
      )
      .subscribe();
  }

  private handleErrorChanges(): void {
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

  private handleSuccessSubmit(): void {
    this.responseData$
      .pipe(
        ObservableHelper.filterNullish(),
        tap((data) => {
          const message = this.isEditDialog
            ? 'Cập nhật thông tin thành công!'
            : 'Thêm CBCT thành công!';
          this.alertService
            .open(message, { status: TuiNotification.Success })
            .subscribe();
          this.context.completeWith(data);
        })
      )
      .subscribe();
  }

  private buildForm(): FormGroup<FormType> {
    const data = this.context.data;
    let invigilatorId: string | undefined;
    let fullName: string | undefined;
    let email: string | undefined;
    let isMale: boolean | undefined;
    let departmentId: string | undefined;
    let phoneNumber: string | null | undefined;

    if (data) {
      if (EditInvigilatorDialogComponent.isTemporaryInvigilator(data)) {
        fullName = data.invigilatorName;
        departmentId = data.departmentId;
      } else {
        invigilatorId = data.invigilatorId;
        fullName = data.fullName;
        email = data.email;
        departmentId = data.department?.id;
        phoneNumber = data.phoneNumber;
      }
    }

    return this.fb.group({
      invigilatorId: this.fb.control(invigilatorId ?? '', Validators.required),
      fullName: this.fb.control(fullName ?? '', Validators.required),
      email: this.fb.control(email ?? '', [
        Validators.required,
        Validators.email,
      ]),
      isMale: this.fb.control(isMale ?? true, Validators.required),
      departmentId: this.fb.control(departmentId ?? '', Validators.required),
      phoneNumber: this.fb.control(phoneNumber ?? ''),
    });
  }

  private static isTemporaryInvigilator(value: any): value is UserTemplate {
    return 'invigilatorName' in value;
  }
}
