import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core';
import { FacultySummary } from '@esm/data';
import { EditFacultyDialogComponent } from '@esm/shared/dialogs';
import { tuiButtonOptionsProvider, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { DataFacultyStore } from './faculty.store';

@Component({
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
