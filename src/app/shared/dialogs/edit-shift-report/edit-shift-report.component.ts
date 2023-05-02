import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExamMethodPipe } from '@esm/core';
import { GetHandoverDataResponseItem } from '@esm/data';
import { LetModule } from '@ngrx/component';
import {
  defaultEditorExtensions,
  TuiEditorModule,
  TUI_EDITOR_EXTENSIONS,
} from '@taiga-ui/addon-editor';
import {
  TuiAlertService,
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogContext,
  TuiNotification,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { tap } from 'rxjs';
import { EditShiftReportDialogStore } from './edit-shift-report.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiInputModule,
  TuiEditorModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'esm-edit-shift-report',
  templateUrl: './edit-shift-report.component.html',
  styleUrls: ['./edit-shift-report.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, ExamMethodPipe, ...NGRX, ...TAIGA_UI],
  providers: [
    EditShiftReportDialogStore,
    tuiButtonOptionsProvider({ appearance: 'primary', size: 'm' }),
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
  ],
})
export class EditShiftReportDialogComponent implements OnInit {
  // INJECT PROPERTIES
  readonly context = inject(POLYMORPHEUS_CONTEXT) as TuiDialogContext<
    string | null,
    GetHandoverDataResponseItem
  >;

  private readonly alertService = inject(TuiAlertService);
  private readonly store = inject(EditShiftReportDialogStore);

  // PUBLIC PROPERTIES
  reportValue = this.context.data.report || '';
  readonly handoverInvigilatorName = this.context.data.invigilatorShift.find(
    (ivs) => ivs.invigilator?.id === this.context.data.handedOverUserId
  )?.invigilator?.fullName;
  readonly status$ = this.store.status$;

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
