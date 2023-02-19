import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TemporaryExamination } from '@esm/data';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddModuleComponent } from '@esm/shared/dialogs';

@Component({
  selector: 'esm-examination-data-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationDataTableComponent implements OnChanges {
  // INPUT
  @Input() temporaryExamination!: TemporaryExamination[];

  // PUBLIC PROPERTIES
  form!: FormGroup;
  readonly columns = [
    'index',
    'moduleId',
    'moduleName',
    'moduleClass',
    'credit',
    'method',
    'date',
    'startAt',
    'endAt',
    'shift',
    'candidateCount',
    'roomsCount',
    'rooms',
    'faculty',
    'department',
    'departmentAssign',
  ];

  // CONSTRUCTOR
  constructor(
    private readonly fb: FormBuilder,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector
  ) {}

  // LIFECYCLE
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['temporaryExamination']) {
      this.buildForm(changes['temporaryExamination'].currentValue);
    }
  }

  // PUBLIC METHODS
  get formControl(): FormArray {
    return this.form.controls['data'] as FormArray;
  }

  onAddModule(rowId: number): void {
  }

  // PRIVATE METHODS
  private buildForm(data: TemporaryExamination[]): void {
    this.form = this.fb.group({
      data: this.fb.array(
        data.map((row) =>
          this.fb.group(
            Object.entries(row).reduce((acc, [key, value]) => {
              acc[key] = [value];
              return acc;
            }, {} as Record<string, any[]>)
          )
        )
      ),
    });
  }
}
