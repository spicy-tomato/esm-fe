import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ExaminationStatus } from '@esm/data';
import { SafeExaminationDataComponent } from '@esm/shared/components';
import {
  TuiAlertService,
  tuiButtonOptionsProvider,
  TuiNotification,
} from '@taiga-ui/core';
import { filter, Subscription, switchMap } from 'rxjs';
import { ExaminationExamStore } from './exam.store';
import { ExaminationExamHeaderComponent } from './header/header.component';
import { ExaminationExamTableComponent } from './table/table.component';

@Component({
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    SafeExaminationDataComponent,
    ExaminationExamHeaderComponent,
    ExaminationExamTableComponent,
  ],
  providers: [
    ExaminationExamStore,
    tuiButtonOptionsProvider({ size: 'xs', appearance: 'icon' }),
  ],
})
export class ExaminationExamComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly alertService = inject(TuiAlertService);
  private readonly store = inject(ExaminationExamStore);

  // VIEWCHILD
  @ViewChild(ExaminationExamTableComponent)
  table!: ExaminationExamTableComponent;

  // PUBLIC PROPERTIES
  ExaminationStatus = ExaminationStatus;
  readonly showLoader$ = this.store.showLoader$;

  // PRIVATE PROPERTIES
  private readonly updateStatus$ = this.store.updateStatus$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleUpdateSuccess();
  }

  // PUBLIC METHODS
  readonly getDataFunc = (): void => {
    this.store.getData();
  };

  save(): void {
    this.table.save();
  }

  // PRIVATE METHODS
  private handleUpdateSuccess(): void {
    this.updateStatus$
      .pipe(
        filter((s) => s === 'success'),
        switchMap(() =>
          this.alertService.open('Thêm học phần thành công!', {
            status: TuiNotification.Success,
          })
        )
      )
      .subscribe();
  }
}
