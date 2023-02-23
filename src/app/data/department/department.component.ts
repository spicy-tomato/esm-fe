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
import { BehaviorSubject, combineLatest, filter, map, tap } from 'rxjs';
import { DataDepartmentStore } from './department.store';

@Component({
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataDepartmentStore],
})
export class DataDepartmentComponent implements OnInit {
  // PUBLIC PROPERTIES
  readonly columns = ['displayId', 'name', 'facultyName', 'action'];
  readonly faculties$ = this.store.faculties$;
  readonly departments$ = this.store.departments$;
  readonly status$ = this.store.status$;
  readonly facultyStringify = StringifyHelper.faculty;

  // GETTER, SETTERS
  private _selectedFaculty: string = '';
  get selectedFaculty(): string {
    return this._selectedFaculty;
  }
  set selectedFaculty(value: string) {
    this._selectedFaculty = value;
    this.selectedFacultyId$.next(value);
  }

  // PRIVATE PROPERTIES
  private readonly selectedFacultyId$ = new BehaviorSubject<string>('');

  readonly selectedFacultyName$ = combineLatest([
    this.faculties$,
    this.selectedFacultyId$,
  ]).pipe(
    map(([faculties, id]) => faculties.find((f) => f.id === id)?.name || '')
  );

  // CONSTRUCTOR
  constructor(
    private readonly route: ActivatedRoute,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly store: DataDepartmentStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.selectedFaculty = this.route.snapshot.queryParams['facultyId'] || '';
  }

  // PUBLIC METHODS
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
