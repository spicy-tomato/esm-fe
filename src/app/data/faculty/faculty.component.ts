import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { Store } from '@ngrx/store';
import { tuiButtonOptionsProvider, TuiDialogService } from '@taiga-ui/core';
import { filter, map, takeUntil, tap } from 'rxjs';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { EditFacultyDialogComponent } from '@esm/shared/dialogs';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { FacultySummary } from '@esm/data';

@Component({
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDestroyService, tuiButtonOptionsProvider({ size: 'm' })],
})
export class DataFacultyComponent {
  // PUBLIC PROPERTIES
  readonly faculties$ = this.appStore.select(AppSelector.departments).pipe(
    map((x) =>
      x.map((f) => {
        const { departments, ...rest } = f;
        return rest;
      })
    ),
    takeUntil(this.destroy$)
  );
  readonly status$ = this.appStore
    .select(AppSelector.departmentsStatus)
    .pipe(takeUntil(this.destroy$));
  readonly columns = ['displayId', 'name', 'action'];

  // CONSTRUCTOR
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly appStore: Store<AppState>,
    private readonly destroy$: TuiDestroyService
  ) {}

  // PUBLIC METHODS
  onAddFaculty(): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(EditFacultyDialogComponent, this.injector)
      )
      .pipe(
        filter((x) => x),
        tap(() => this.appStore.dispatch(AppPageAction.getDepartments()))
      )
      .subscribe();
  }

  onEditFaculty(faculty: FacultySummary): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(EditFacultyDialogComponent, this.injector),
        {
          data: faculty,
        }
      )
      .pipe(
        filter((x) => x),
        tap(() => this.appStore.dispatch(AppPageAction.getDepartments()))
      )
      .subscribe();
  }
}
