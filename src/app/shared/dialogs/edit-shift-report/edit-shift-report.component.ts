import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { GetHandoverDataResponseItem } from '@esm/data';
import {
  defaultEditorExtensions,
  TUI_EDITOR_EXTENSIONS,
} from '@taiga-ui/addon-editor';
import {
  TuiAlertService,
  tuiButtonOptionsProvider,
  TuiDialogContext,
  TuiNotification,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { tap } from 'rxjs';
import { EditShiftReportDialogStore } from './edit-shift-report.store';

@Component({
  selector: 'esm-edit-shift-report',
  templateUrl: './edit-shift-report.component.html',
  styleUrls: ['./edit-shift-report.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EditShiftReportDialogStore,
    tuiButtonOptionsProvider({ appearance: 'primary', size: 'm' }),
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
  ],
})
export class EditShiftReportComponent implements OnInit {
  // PUBLIC PROPERTIES
  reportValue = this.context.data.report || '';
  readonly status$ = this.store.status$;

  // CONSTRUCTOR
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    public readonly context: TuiDialogContext<
      string | null,
      GetHandoverDataResponseItem
    >,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private readonly store: EditShiftReportDialogStore
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.handleActionDone();
  }

  // PUBLIC METHODS
  onFinish(): void {
    this.store.update({
      shiftId: this.context.data.id,
      report: this.reportValue,
    });
  }

  // PRIVATE METHODS
  private handleActionDone(): void {
    this.status$
      .pipe(
        tap((status) => {
          if (status === 'success') {
            this.alertService
              .open('Đã cập nhật biên bản', { status: TuiNotification.Success })
              .subscribe();
            this.context.completeWith(this.reportValue);
          }
        })
      )
      .subscribe();
  }
}
