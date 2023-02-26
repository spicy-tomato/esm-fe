import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StringifyHelper } from '@esm/cdk';
import { DepartmentSummary } from '@esm/data';
import { EditDepartmentDialogComponent } from '@esm/shared/dialogs';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { DataDepartmentStore } from './department.store';

@Component({
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.less'],
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
