import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  DefaultValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ObjectPipe } from '@esm/core';
import {
  GetAvailableInvigilatorsInShiftGroupResponseItem,
  GetAvailableInvigilatorsInShiftGroupTemporaryInvigilator,
  UserSummary,
} from '@esm/data';
import {
  EditInvigilatorDialogComponent,
  SelectTeacherDialogComponent,
} from '@esm/shared/dialogs';
import { TuiContextWithImplicit, TuiStringHandler } from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiDialogService,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import {
  InvigilatorAssignRoomStore,
  ShiftUiModel,
} from '../../assign-room.store';
import { LetModule } from '@ngrx/component';

export const TAIGA_UI = [
  TuiDataListModule,
  TuiSelectModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'esm-invigilator-assign-room-table-teacher-cell',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LetModule,
    ObjectPipe,
    ...TAIGA_UI,
  ],
  templateUrl: './teacher-cell.component.html',
  styleUrls: ['./teacher-cell.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultValueAccessor),
      multi: true,
    },
  ],
})
export class InvigilatorAssignRoomTableTeacherCellComponent
  implements ControlValueAccessor
{
  // INJECT PROPERTIES
  ngControl = inject(NgControl);
  private readonly store = inject(InvigilatorAssignRoomStore);
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);

  // INPUT
  @Input()
  row!: ShiftUiModel;

  @Input()
  invigilatorContent!: TuiStringHandler<TuiContextWithImplicit<string>>;

  @Input()
  invigilatorsData!: GetAvailableInvigilatorsInShiftGroupResponseItem[string];

  // VIEW CHILD
  @ViewChild(DefaultValueAccessor)
  valueAccessor?: DefaultValueAccessor;

  // PUBLIC PROPERTIES
  readonly temporaryInvigilatorModel!: GetAvailableInvigilatorsInShiftGroupTemporaryInvigilator;
  readonly usedInvigilatorsMap$ = this.store.usedInvigilatorsMap$;

  // GETTERS
  get control(): FormControl {
    return this.ngControl.control! as FormControl;
  }

  // IMPLEMENTATIONS
  writeValue(obj: any): void {
    this.valueAccessor?.writeValue(obj);
  }

  registerOnChange(fn: any): void {
    this.valueAccessor?.registerOnChange(fn);
  }

  registerOnTouched(fn: any): void {
    this.valueAccessor?.registerOnTouched(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    this.valueAccessor?.setDisabledState(isDisabled);
  }

  // PUBLIC METHODS
  onInvigilatorChanges(
    currentShiftGroupId: string,
    currentShiftId: string,
    newInvigilatorId: any
  ): void {
    const newValue = this.usedInvigilatorsMap$.value;
    newValue[currentShiftGroupId] ??= {};
    const shiftGroupDataEntries = Object.entries(newValue[currentShiftGroupId]);

    // Remove old invigilator
    for (const [invigilatorId, shiftId] of shiftGroupDataEntries) {
      if (shiftId === currentShiftId) {
        delete newValue[currentShiftGroupId][invigilatorId];
      }
    }

    // Assign new one
    if (newInvigilatorId) {
      newValue[currentShiftGroupId][newInvigilatorId] = currentShiftId;
    }

    this.usedInvigilatorsMap$.next(newValue);
  }

  onAddNewInvigilator(
    invigilatorName: string,
    departmentId: string,
    shiftGroupId: string
  ): void {
    this.dialogService
      .open<UserSummary>(
        new PolymorpheusComponent(
          EditInvigilatorDialogComponent,
          this.injector
        ),
        { data: { invigilatorName, departmentId } }
      )
      .pipe(
        filter((x) => !!x),
        tap(({ id }) =>
          this.store.updateTeacherAssignment({
            shiftGroupId,
            departmentId,
            userId: id,
          })
        )
      )
      .subscribe();
  }

  onAddOtherInvigilator(shiftGroupId: string): void {
    this.dialogService
      .open<UserSummary>(
        new PolymorpheusComponent(SelectTeacherDialogComponent, this.injector)
      )
      .pipe(tap(({ id }) => this.store.save({ [shiftGroupId]: id })))
      .subscribe();
  }
}
