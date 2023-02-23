import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injector,
} from '@angular/core';
import { tuiButtonOptionsProvider, TuiDialogService } from '@taiga-ui/core';
import { DataDepartmentStore } from './department.store';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { DepartmentSummary } from '@esm/data';
import { EditDepartmentDialogComponent } from '@esm/shared/dialogs';

@Component({
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataDepartmentStore, tuiButtonOptionsProvider({ size: 'm' })],
})
export class DataDepartmentComponent {
  // PUBLIC PROPERTIES
  readonly departments$ = this.store.departments$;
  readonly status$ = this.store.status$;
  readonly columns = ['displayId', 'name', 'facultyName', 'action'];

  // CONSTRUCTOR
  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly store: DataDepartmentStore
  ) {}

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
}
