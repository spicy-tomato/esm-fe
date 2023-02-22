import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { FacultySummary } from '@esm/data';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiNotification,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, tap } from 'rxjs';
import { EditFacultyDialogStore } from './edit-faculty.store';

@Component({
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EditFacultyDialogStore],
})
export class EditFacultyDialogComponent implements OnInit {
  form = this.fb.group({
    displayId: ['', Validators.required],
    name: ['', Validators.required],
  });
  readonly isEditDialog = this.context.data !== undefined;
  readonly status$ = this.store.status$;

  // CONSTRUCTOR
  constructor(
    private readonly fb: NonNullableFormBuilder,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      boolean,
      FacultySummary | undefined
    >,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private readonly store: EditFacultyDialogStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleCreateSuccess();
  }

  // PUBLIC METHODS
  onCreate(): void {
    this.store.create(this.form.getRawValue());
  }

  // PRIVATE METHODS
  private handleCreateSuccess(): void {
    this.status$
      .pipe(
        filter((s) => s === 'success'),
        tap(() => {
          this.alertService
            .open('Thêm khoa thành công!', {
              status: TuiNotification.Success,
            })
            .subscribe();
          this.context.completeWith(true);
        })
      )
      .subscribe();
  }
}
