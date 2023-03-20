import { ScrollingModule } from '@angular/cdk/scrolling';
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
import { UserSummary } from '@esm/data';
import { EditInvigilatorDialogComponent } from '@esm/shared/dialogs';
import { VarDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiFilterPipeModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiDialogService,
  TuiHintModule,
  TuiLoaderModule,
  TuiScrollbarModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { DataInvigilatorStore } from './invigilator.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiHintModule,
  TuiLoaderModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiTableModule,
];

@Component({
  templateUrl: './invigilator.component.html',
  styleUrls: ['./invigilator.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    EditInvigilatorDialogComponent,
    ScrollingModule,
    VarDirective,
    ...NGRX,
    ...TAIGA_UI,
  ],
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
