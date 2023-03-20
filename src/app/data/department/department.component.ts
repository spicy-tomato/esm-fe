import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StringifyHelper } from '@esm/cdk';
import { DepartmentSummary } from '@esm/data';
import { EditDepartmentDialogComponent } from '@esm/shared/dialogs';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogService,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { DataDepartmentStore } from './department.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiSelectModule,
  TuiTableModule,
];

@Component({
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.less'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    EditDepartmentDialogComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataDepartmentStore],
})
export class DataDepartmentComponent implements OnInit {
  // PUBLIC PROPERTIES
  readonly invigilatorRouterLink = '/data/invigilator';
  readonly columns = ['displayId', 'name', 'facultyName', 'action'];
  readonly faculties$ = this.store.faculties$;
  readonly departments$ = this.store.departments$;
  readonly selectedFacultyId$ = this.store.selectedFacultyId$;
  readonly selectedFacultyName$ = this.store.selectedFacultyName$;
  readonly status$ = this.store.status$;
  readonly facultyStringify = StringifyHelper.idName;

  // CONSTRUCTOR
  constructor(
    private readonly route: ActivatedRoute,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly store: DataDepartmentStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    const facultyIdFromRoute =
      this.route.snapshot.queryParams['facultyId'] || '';
    this.store.changeSelectedFaculty(facultyIdFromRoute);
  }

  // PUBLIC METHODS
  onChangeSelectedFaculty(facultyId: string): void {
    this.store.changeSelectedFaculty(facultyId);
  }

  openDialog(data?: DepartmentSummary): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(EditDepartmentDialogComponent, this.injector),
        { data }
      )
      .pipe(
        filter((x) => x),
        tap(() => this.store.load())
      )
      .subscribe();
  }

  readonly departmentMatcher = (
    item: DepartmentSummary,
    facultyId: string
  ): boolean => !facultyId || item.faculty?.id === facultyId;
}
