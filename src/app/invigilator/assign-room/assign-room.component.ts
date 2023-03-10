import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';

type Item = {
  id: string;
  moduleId: string;
  moduleName: string;
  startAt: Date;
  shift: number;
  room: string;
  teacher: string[];
  department: string[];
  size: number;
};

@Component({
  templateUrl: './assign-room.component.html',
  styleUrls: ['./assign-room.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiButtonOptionsProvider({ size: 'm' })],
})
export class InvigilatorAssignRoomComponent {
  // PUBLIC PROPERTIES
  data: Item[] = data;
  isEditing = false;
  departments = Object.keys(teacherData);
  columns = [
    'moduleId',
    'moduleName',
    'startAt',
    'shift',
    'department',
    'teacher',
    'phoneNumber',
  ];

  readonly form!: FormGroup;
  readonly isSaving$ = new BehaviorSubject<boolean>(false);

  // CONSTRUCTOR
  constructor(private readonly fb: NonNullableFormBuilder) {
    this.form = this.fb.group({
      assign: this.fb.array(
        this.data.map((item) =>
          this.fb.array(
            new Array(item.size).fill(null).map(() =>
              this.fb.group({
                department: ['', Validators.required],
                teacher: ['', Validators.required],
              })
            )
          )
        )
      ),
    });

    this.form.disable();
  }

  // PUBLIC METHODS
  row(index: number): FormArray {
    return (this.form.controls['assign'] as FormArray).at(index) as FormArray;
  }

  control(index: number, subIndex: number, controlName: string): FormControl {
    return (this.row(index).at(subIndex) as FormGroup).controls[
      controlName
    ] as FormControl;
  }

  getTeacher(index: number, subIndex: number): string[] {
    const department = this.control(index, subIndex, 'department')
      .value as keyof typeof teacherData;
    return teacherData[department];
  }

  onDepartmentChanges(index: number, subIndex: number): void {
    this.control(index, subIndex, 'teacher').setValue('');
  }

  saveChange(): void {
    this.isSaving$.next(true);
    setTimeout(() => {
      data = (this.form.controls['assign'] as FormArray).value;
      this.toggleEdit(false);
      this.isSaving$.next(false);
    }, 1000);
  }

  cancelEdit(): void {
    (this.form.controls['assign'] as FormArray).patchValue(data);
    this.toggleEdit(false);
  }

  toggleEdit(isEditing: boolean): void {
    this.isEditing = isEditing;
    if (isEditing) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }
}

let data: Item[] = [
  {
    id: '1',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '2',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 2,
  },
  {
    id: '3',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 3,
  },
  {
    id: '4',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '5',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '6',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '7',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '8',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '9',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '10',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '13',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '14',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '15',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '16',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '17',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '18',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '11',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '12',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '13',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '14',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '15',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '16',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '17',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '18',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '19',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '110',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '113',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '114',
    moduleId: 'BS0.001.2',
    moduleName: 'Gi???i t??ch 1',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '115',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '116',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '117',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
  {
    id: '118',
    moduleId: 'BS0.101.3',
    moduleName: '?????i s??? tuy???n t??nh',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
];

let teacherData = {
  'C?? ??i???n t???': [
    'L?? C??ng B??o',
    'Tr???nh Tu???n D????ng',
    'Ph???m Xu??n Hi???n',
    '??inh Th??? Thanh Huy???n',
    'Nguy???n Thanh L???ch',
    'Nguy???n B?? Ngh???',
    'L?? L??ng V??n',
    'Nguy???n Cao V??n',
    'Ph???m Ho??ng V????ng',
  ],
  'C?? kh?? ??t??': [
    'Nguy???n Th??nh C??ng',
    'Nguy???n Quang C?????ng',
    'V?? Tu???n ?????t',
    'Ph???m Trung D??ng',
    'Tr????ng M???nh H??ng',
    'Tr????ng M???nh H??ng',
    'T??? Th??? Thanh Huy???n',
    'T??? Th??? Thanh Huy???n',
    'Nguy???n Thi???t L???p',
    'Nguy???n H??ng M???nh',
    'Tr???n V??n Nh??',
    'Nguy???n H???ng Qu??n',
    '????? Kh???c S??n',
    'V?? V??n T???n',
    'Ph???m T???t Th???ng',
    'Nguy???n ?????c Trung',
  ],
  'C??ng ngh??? GTVT': [
    'V?? Duy ?????c',
    'Nguy???n V??n H??o',
    'Nguy???n V??n H?????ng',
    'Tr???n Th??? V??n Nga',
    'Ph???m ?????c Th??nh',
    'Nguy???n Th??? Hi???u Th???o',
    'Nguy???n ?????c V??n',
  ],
  '?????u m??y Toa xe': [
    'T??o V??n Chi???n',
    'Nguy???n Trung Hi???u',
    'Ph???m Huy Kh????ng',
    'Ki???u C??ng Th??nh',
    'V?? Th??? Ho??i Thu',
    'Ph???m V??n Ti???n',
    'Nguy???n ?????c To??n',
  ],
  'K??? thu???t nhi???t': [
    'Tr???n V??n B???y',
    'Nguy???n Th??? Th??y Dung',
    'Tr???n Th??? Thu H??',
    'Ph???m V??n Kh??',
    'Nguy???n ????ng Kho??t',
  ],
  'M??y ?????ng l???c': [
    'Kh????ng Th??? H??',
    'Nguy???n Th??n Qu???nh',
    'V?? Xu??n Thi???p',
    '????? V??n Tr???n',
    'Nguy???n Cao V??n',
  ],
  'M??y x??y d???ng': [
    'Nguy???n Tho???i Anh',
    'Nguy???n Th??y Chi',
    'B??i Thanh Danh',
    'Ph???m Tr???ng Ho??',
    'Ph???m Tr???ng H??a',
    'Nguy???n Quang Minh',
    'Nguy???n Anh Ng???c',
    'L?? To??n Th???ng',
    'Nguy???n V??n Thuy??n',
    'Nguy???n Ng???c Trung',
    'V?? V??n Trung',
    '??o??n V??n T??',
    'Ph???m Anh Tu???n',
  ],
  'Thi???t k??? m??y': [
    'Nguy???n V??n C?????ng',
    'Tr????ng T???t ????ch',
    'B??i V?? H??ng',
    'B??i V??n H??ng',
    'Nguy???n Quang Vinh',
    'Ng?? Anh V??',
  ],
  'VP Khoa C?? kh??': ['V?? Ho??ng', '????? Thanh Huy???n'],
};
