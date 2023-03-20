import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FacultySummary } from '@esm/data';
import { EditFacultyDialogComponent } from '@esm/shared/dialogs';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogService,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { DataFacultyStore } from './faculty.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiHintModule,
  TuiLinkModule,
  TuiLoaderModule,
  TuiTableModule,
];

@Component({
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    EditFacultyDialogComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [DataFacultyStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class DataFacultyComponent {
  // PUBLIC PROPERTIES
  readonly departmentRouterLink = '/data/department';
  readonly columns = ['displayId', 'name', 'action'];
  readonly faculties$ = this.store.faculties$;
  readonly status$ = this.store.status$;

  // CONSTRUCTOR
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly store: DataFacultyStore
  ) {}

  // PUBLIC METHODS
  openDialog(data?: FacultySummary): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(EditFacultyDialogComponent, this.injector),
        { data }
      )
      .pipe(
        filter((x) => x),
        tap(() => this.store.load())
      )
      .subscribe();
  }
}
