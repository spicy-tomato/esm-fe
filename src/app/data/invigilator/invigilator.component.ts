import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StringifyHelper } from '@esm/cdk';
import { UserSummary } from '@esm/data';
import { EditInvigilatorDialogComponent } from '@esm/shared/dialogs';
import { tuiButtonOptionsProvider, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { DataInvigilatorStore } from './invigilator.store';

@Component({
  templateUrl: './invigilator.component.html',
  styleUrls: ['./invigilator.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataInvigilatorStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class DataInvigilatorComponent implements OnInit {
  // PUBLIC PROPERTIES
  readonly routerLink = '/data/invigilator';
  readonly columns = [
    'displayId',
    'name',
    'facultyName',
    'departmentName',
    'action',
  ];
  readonly faculties$ = this.store.faculties$;
  readonly departments$ = this.store.departments$;
  readonly invigilators$ = this.store.invigilators$;
  readonly selectedFacultyId$ = this.store.selectedFacultyId$;
  readonly selectedFacultyName$ = this.store.selectedFacultyName$;
  readonly selectedDepartmentId$ = this.store.selectedDepartmentId$;
  readonly selectedDepartmentName$ = this.store.selectedDepartmentName$;
  readonly status$ = this.store.status$;
  readonly facultyStringify = StringifyHelper.idName;

  // CONSTRUCTOR
  constructor(
    private readonly route: ActivatedRoute,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly store: DataInvigilatorStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        tap((params) => {
          this.store.changeQueryParams({
            facultyId: params['facultyId'] || '',
            departmentId: params['departmentId'] || '',
          });
        })
      )
      .subscribe();
  }

  // PUBLIC METHODS
  openDialog(data?: UserSummary): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(
          EditInvigilatorDialogComponent,
          this.injector
        ),
        { data }
      )
      .pipe(
        filter((x) => x),
        tap(() => this.store.loadAfterCreated())
      )
      .subscribe();
  }

  readonly userMatcher = (
    item: UserSummary,
    facultyId: string,
    departmentId: string
  ): boolean =>
    !facultyId ||
    (item.department?.faculty?.id === facultyId && !departmentId) ||
    item.department?.id === departmentId;
}
