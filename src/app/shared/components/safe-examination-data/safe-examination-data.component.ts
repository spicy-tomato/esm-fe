import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ExaminationStatus } from '@esm/data';
import { LetModule } from '@ngrx/component';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import {
  BehaviorSubject,
  Observable,
  filter,
  take,
  takeUntil,
  tap,
} from 'rxjs';
import { SafeExaminationDataStore } from './safe-examination-data.store';
import { TuiDestroyService } from '@taiga-ui/cdk';

export const TAIGA_UI = [TuiLinkModule, TuiLoaderModule];

@Component({
  selector: 'esm-safe-examination-data',
  standalone: true,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
  templateUrl: './safe-examination-data.component.html',
  styleUrls: ['./safe-examination-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SafeExaminationDataStore, TuiDestroyService],
})
export class SafeExaminationDataComponent implements OnChanges {
  // INJECT PROPERTIES
  private readonly store = inject(SafeExaminationDataStore);
  private readonly destroy$ = inject(TuiDestroyService);

  @Input() minimumStatus: ExaminationStatus = ExaminationStatus.Inactive;
  @Input() getDataFunc!: Function;
  @Input() showLoader!: Observable<boolean> | boolean;

  ExaminationStatus = ExaminationStatus;
  readonly loadMessage$ = new BehaviorSubject<boolean | null>(null);
  readonly examinationStatus$ = this.store.examinationStatus$;

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(changes);
  // }

  // LIFECYCLE
  ngOnChanges(): void {
    // this.loadMessage$
    //   .pipe(
    //     filter((loadMessage) => loadMessage === false),
    //     tap(() => this.getDataFunc()),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe();

    this.examinationStatus$
      .pipe(
        tap((status) => {
          const loadMessage = status < this.minimumStatus;
          this.loadMessage$.next(loadMessage);
          if (!loadMessage) {
            this.getDataFunc();
          }
        }),
      )
      .subscribe();
  }
}
