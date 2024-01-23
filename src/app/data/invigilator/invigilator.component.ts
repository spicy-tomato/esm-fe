import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ESMDomainDtosUserUserSummary } from '@esm/api';
import { StringifyHelper } from '@esm/cdk';
import { UserSummary } from '@esm/data';
import { EditInvigilatorDialogComponent } from '@esm/shared/dialogs';
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
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [DataInvigilatorStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class DataInvigilatorComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly dialogService = inject(TuiDialogService);
  private readonly injector = inject(Injector);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(DataInvigilatorStore);

  // PUBLIC PROPERTIES
  readonly routerLink = '/data/invigilator';
  readonly facultyStringify = StringifyHelper.idName;
  readonly columns = [
    'displayId',
    'name',
    'facultyName',
    'departmentName',
    'action',
  ];

  readonly status$ = this.store.status$;
  readonly tableObservables$ = this.store.tableObservables$;
  readonly headerObservables$ = this.store.headerObservables$;

  // LIFECYCLE
  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        tap((params) => {
          this.store.changeQueryParams({
            facultyId: params['facultyId'] || '',
            departmentId: params['departmentId'] || '',
          });
        }),
      )
      .subscribe();
  }

  // PUBLIC METHODS
  openDialog(data?: UserSummary): void {
    this.dialogService
      .open<UserSummary>(
        new PolymorpheusComponent(
          EditInvigilatorDialogComponent,
          this.injector,
        ),
        { data },
      )
      .pipe(
        filter((x) => !!x),
        tap(() => this.store.loadAfterCreated()),
      )
      .subscribe();
  }

  readonly userMatcher = (
    item: ESMDomainDtosUserUserSummary,
    facultyId: string,
    departmentId: string,
  ): boolean =>
    !facultyId ||
    (item.department?.faculty?.id === facultyId && !departmentId) ||
    item.department?.id === departmentId;
}
