import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LetModule } from '@ngrx/component';
import {
  TuiAlertService,
  tuiButtonOptionsProvider,
  TuiLoaderModule,
  TuiNotification,
} from '@taiga-ui/core';
import { combineLatest, filter, map, switchMap } from 'rxjs';
import { ExaminationExamStore } from './exam.store';
import { ExaminationExamHeaderComponent } from './header/header.component';
import { ExaminationExamTableComponent } from './table/table.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiLoaderModule];

@Component({
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ExaminationExamHeaderComponent,
    ExaminationExamTableComponent,
    ...NGRX,
    ...TAIGA_UI,
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
  readonly showLoader$ = combineLatest([
    this.store.dataStatus$,
    this.store.updateStatus$,
  ]).pipe(map((statuses) => statuses.includes('loading')));

  // PRIVATE PROPERTIES
  private readonly updateStatus$ = this.store.updateStatus$;

  // LIFECYCLE
  ngOnInit(): void {
    this.handleUpdateSuccess();
    this.store.getData();
  }

  // PUBLIC METHODS
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
