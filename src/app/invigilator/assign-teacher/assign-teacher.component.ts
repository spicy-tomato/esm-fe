import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';
import { InvigilatorAssignTeacherStore } from './assign-teacher.store';

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
  templateUrl: './assign-teacher.component.html',
  styleUrls: ['./assign-teacher.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    InvigilatorAssignTeacherStore,
    tuiButtonOptionsProvider({ size: 'm' }),
  ],
})
export class InvigilatorAssignTeacherComponent {
  // PUBLIC PROPERTIES
  data: Item[] = data;
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
  readonly faculty$ = this.store.faculty$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly store: InvigilatorAssignTeacherStore
  ) {
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
      this.isSaving$.next(false);
    }, 1000);
  }
}

let data: Item[] = [
  {
    id: '1',
    moduleId: 'BS0.001.2',
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Giải tích 1',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
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
    moduleName: 'Đại số tuyến tính',
    startAt: new Date(),
    shift: 2,
    room: '403-A4',
    teacher: [],
    department: [],
    size: 1,
  },
];

let teacherData = {
  'Cơ điện tử': [
    'Lê Công Báo',
    'Trịnh Tuấn Dương',
    'Phạm Xuân Hiển',
    'Đinh Thị Thanh Huyền',
    'Nguyễn Thanh Lịch',
    'Nguyễn Bá Nghị',
    'Lê Lăng Vân',
    'Nguyễn Cao Văn',
    'Phạm Hoàng Vương',
  ],
  'Cơ khí ôtô': [
    'Nguyễn Thành Công',
    'Nguyễn Quang Cường',
    'Vũ Tuấn Đạt',
    'Phạm Trung Dũng',
    'Trương Mạnh Hùng',
    'Trương Mạnh Hùng',
    'Tạ Thị Thanh Huyền',
    'Tạ Thị Thanh Huyền',
    'Nguyễn Thiết Lập',
    'Nguyễn Hùng Mạnh',
    'Trần Văn Như',
    'Nguyễn Hồng Quân',
    'Đỗ Khắc Sơn',
    'Vũ Văn Tấn',
    'Phạm Tất Thắng',
    'Nguyễn Đức Trung',
  ],
  'Công nghệ GTVT': [
    'Vũ Duy Đức',
    'Nguyễn Văn Hào',
    'Nguyễn Văn Hưởng',
    'Trần Thị Vân Nga',
    'Phạm Đức Thành',
    'Nguyễn Thị Hiếu Thảo',
    'Nguyễn Đức Văn',
  ],
  'Đầu máy Toa xe': [
    'Tào Văn Chiến',
    'Nguyễn Trung Hiếu',
    'Phạm Huy Khương',
    'Kiều Công Thành',
    'Vũ Thị Hoài Thu',
    'Phạm Văn Tiến',
    'Nguyễn Đức Toàn',
  ],
  'Kỹ thuật nhiệt': [
    'Trần Văn Bẩy',
    'Nguyễn Thị Thùy Dung',
    'Trần Thị Thu Hà',
    'Phạm Văn Khá',
    'Nguyễn Đăng Khoát',
  ],
  'Máy động lực': [
    'Khương Thị Hà',
    'Nguyễn Thìn Quỳnh',
    'Vũ Xuân Thiệp',
    'Đỗ Văn Trấn',
    'Nguyễn Cao Văn',
  ],
  'Máy xây dựng': [
    'Nguyễn Thoại Anh',
    'Nguyễn Thùy Chi',
    'Bùi Thanh Danh',
    'Phạm Trọng Hoà',
    'Phạm Trọng Hòa',
    'Nguyễn Quang Minh',
    'Nguyễn Anh Ngọc',
    'Lê Toàn Thắng',
    'Nguyễn Văn Thuyên',
    'Nguyễn Ngọc Trung',
    'Vũ Văn Trung',
    'Đoàn Văn Tú',
    'Phạm Anh Tuấn',
  ],
  'Thiết kế máy': [
    'Nguyễn Văn Cường',
    'Trương Tất Đích',
    'Bùi Vũ Hùng',
    'Bùi Văn Hưng',
    'Nguyễn Quang Vinh',
    'Ngô Anh Vũ',
  ],
  'VP Khoa Cơ khí': ['Vũ Hoàng', 'Đỗ Thanh Huyền'],
};
