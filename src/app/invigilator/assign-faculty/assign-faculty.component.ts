import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';
import { ShiftGroupSimple, ExaminationStatus, FacultySummary } from '@esm/data';
import { ConfirmDialogComponent } from '@esm/shared/dialogs';
import { tuiButtonOptionsProvider, TuiDialogService } from '@taiga-ui/core';
import { TuiInputNumberComponent } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { combineLatest, map, tap } from 'rxjs';
import { InvigilatorAssignFacultyStore } from './assign-faculty.store';

@Component({
  templateUrl: './assign-faculty.component.html',
  styleUrls: ['./assign-faculty.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    InvigilatorAssignFacultyStore,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
})
export class InvigilatorAssignFacultyComponent implements OnInit {
  // VIEWCHILD
  @ViewChild('input') input!: TuiInputNumberComponent;
  @ViewChild('viewport') viewport!: CdkVirtualScrollViewport;

  // PUBLIC PROPERTIES
  form!: FormGroup;
  inputValue = 0;
  inputOldValue = 0;
  inputStyle: {
    top: string;
    left: string;
    width: string;
    height: string;
  } | null = null;
  focusedCellData: {
    rowId: number;
    facultyId: string;
  } | null = null;
  focusedControl: FormControl | null = null;

  readonly data$ = this.store.data$;
  readonly faculties$ = this.store.faculties$;
  readonly updateRows$ = this.store.updateRows$;
  readonly examination$ = this.store.examination$;
  readonly showLoader$ = combineLatest([
    this.store.dataStatus$,
    this.store.calculateStatus$,
  ]).pipe(map((statuses) => statuses.includes('loading')));
  readonly columns$ = this.store.faculties$.pipe(
    map((faculties) => [
      'moduleId',
      'moduleName',
      'method',
      'startAt',
      'shift',
      'facultyName',
      'roomsCount',
      'invigilatorsCount',
      ...faculties.map((f) => f.id),
      'total',
      'difference',
    ])
  );
  readonly ExaminationStatus = ExaminationStatus;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly store: InvigilatorAssignFacultyStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleBuildForm();
    this.store.getData();
  }

  // PUBLIC METHODS
  get formControl(): FormArray {
    return this.form.controls['data'] as FormArray;
  }

  facultyControl(index: number, facultyId: string): FormControl {
    return (this.form.controls['data'] as FormArray)
      .at(index)
      .get(facultyId) as FormControl;
  }

  calculate(): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(ConfirmDialogComponent, this.injector),
        {
          data: {
            message:
              'Thao t??c n??y s??? l??m m???i to??n b??? d??? li???u ph??n gi???ng trong k??? thi. V???n ti???p t???c?',
            onConfirm: this.store.calculate,
            confirmStatus: this.store.calculateStatus$,
          },
        }
      )
      .subscribe();
  }

  finishAssign(): void {
    this.store.finishAssign();
  }

  onDoubleClickCell(evt: MouseEvent, rowId: number, facultyId: string): void {
    this.focusedControl = this.facultyControl(rowId, facultyId);
    this.inputValue = this.inputOldValue = this.focusedControl.value.actual;
    this.focusedCellData = { rowId, facultyId };

    const boundingRect = (
      evt.target as HTMLTableCellElement
    ).getBoundingClientRect();
    const target = evt.target as HTMLTableCellElement;

    this.inputStyle = {
      top: target.offsetTop + 'px',
      left: target.offsetLeft + 'px',
      width: boundingRect.width + 'px',
      height: boundingRect.height + 'px',
    };

    setTimeout(() => {
      this.input.nativeFocusableElement?.select();
    });
  }

  onFocusedChange(focus: boolean): void {
    if (!focus && this.focusedCellData) {
      if (this.inputValue !== this.inputOldValue) {
        const { rowId, facultyId } = this.focusedCellData;
        this.store.save({
          rowId,
          facultyId,
          numberOfInvigilator: this.inputValue,
        });
      }

      this.inputStyle = null;
      this.focusedControl = null;
      this.focusedCellData = null;
    }
  }

  // PRIVATE METHODS
  private handleBuildForm(): void {
    combineLatest([this.faculties$, this.data$])
      .pipe(tap(([faculties, data]) => this.buildForm(faculties, data)))
      .subscribe();
  }

  private buildForm(
    faculties: FacultySummary[],
    data: ShiftGroupSimple[]
  ): void {
    this.form = this.fb.group({
      data: this.fb.array(
        data.map((row) =>
          this.fb.group({
            ...this.buildFormDataPart(row),
            ...this.buildFormFacultyPart(row, faculties),
            ...this.buildFormCalculatePart(row),
          })
        )
      ),
    }) as any;
  }

  private buildFormDataPart(group: ShiftGroupSimple): Record<string, any[]> {
    const columns: (keyof ShiftGroupSimple)[] = [
      'module',
      'method',
      'startAt',
      'shift',
      'roomsCount',
      'invigilatorsCount',
    ];

    return columns.reduce((acc, curr) => {
      acc[curr] = [group[curr]];
      return acc;
    }, {} as Record<string, any[]>);
  }

  private buildFormFacultyPart(
    group: ShiftGroupSimple,
    faculties: FacultySummary[]
  ): Record<string, any[]> {
    return faculties.reduce((acc, { id }) => {
      acc[id] = [group.assignNumerate[id] || 0];
      return acc;
    }, {} as Record<string, any[]>);
  }

  private buildFormCalculatePart(
    group: ShiftGroupSimple
  ): Record<string, any[]> {
    return {
      total: [group.assignNumerate['total']],
    };
  }
}
