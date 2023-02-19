import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';

type Item = {
  id: string;
  moduleId: string;
  moduleName: string;
  method: string;
  startAt: Date;
  shift: number;
  room: string;
  examsCount: number;
  candidatesCount: number;
};

@Component({
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiButtonOptionsProvider({ size: 'm' })],
})
export class ExamComponent {
  // PUBLIC PROPERTIES
  data: Item[] = data;
  isEditing = false;
  readonly isSaving$ = new BehaviorSubject<boolean>(false);

  readonly columns = [
    'moduleId',
    'moduleName',
    'method',
    'startAt',
    'shift',
    'room',
    'candidatesCount',
    'examsCount',
  ];
  readonly form!: FormGroup;

  readonly minExamsCount: ValidatorFn = ({ value }) =>
    value > 0 ? null : { minExamsCount: 'Exams count must be above 0' };

  // CONSTRUCTOR
  constructor(private readonly fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      examsCount: this.fb.array(
        this.data.map((item) => item.candidatesCount),
        [Validators.required, Validators.min(0)]
      ),
    });
  }

  // PUBLIC METHODS
  onValueChange(id: string, value: number): void {
    for (const item of this.data) {
      if (item.id === id) {
        item.examsCount = value;
        break;
      }
    }

    this.data = this.data;
  }

  examsCount(index: number): FormControl {
    return (this.form.controls['examsCount'] as FormArray).at(
      index
    ) as FormControl;
  }

  saveChange(): void {
    this.isSaving$.next(true);
    setTimeout(() => {
      data = (this.form.controls['examsCount'] as FormArray).value;
      this.toggleEdit(false);
      this.isSaving$.next(false);
    }, 1000);
  }

  cancelEdit(): void {
    (this.form.controls['examsCount'] as FormArray).patchValue(data);
    this.toggleEdit(false);
  }

  toggleEdit(isEditing: boolean): void {
    this.isEditing = isEditing;
  }
}

let data: Item[] = [
  {
    id: '1',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '2',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '3',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '4',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '5',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '6',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '7',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '8',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '9',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '10',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '13',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '14',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '15',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '16',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '17',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '18',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '11',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '12',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '13',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '14',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '15',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '16',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '17',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '18',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '19',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '110',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '113',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '114',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
    method: 'Trắc nghiệm',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 0,
    candidatesCount: 100,
  },
  {
    id: '115',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '116',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '117',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
  {
    id: '118',
    moduleId: 'BS0.101.3',
    moduleName: 'Đại số tuyến tính',
    method: 'Tự luận',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    examsCount: 55,
    candidatesCount: 55,
  },
];
