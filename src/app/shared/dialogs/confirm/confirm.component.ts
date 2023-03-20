import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Status } from '@esm/cdk';
import { LetModule } from '@ngrx/component';
import {
  TuiButtonModule,
  TuiDialogContext,
  TuiSvgModule,
} from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, Observable, tap } from 'rxjs';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiButtonModule, TuiSvgModule];

@Component({
  selector: 'esm-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less'],
  standalone: true,
  imports: [CommonModule, ...NGRX, ...TAIGA_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {
  // PUBLIC PROPERTIES
  confirmStatus$ = this.context.data?.confirmStatus;

  // CONSTRUCTOR
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    public readonly context: TuiDialogContext<
      boolean,
      {
        message: string;
        onConfirm: () => void;
        confirmStatus?: Observable<Status>;
      }
    >
  ) {}

  // LIFECYCLE
  ngOnInit(): void {
    this.confirmStatus$
      ?.pipe(
        filter((s, i) => i !== 0 && s === 'success'),
        tap(() => this.context.completeWith(true))
      )
      .subscribe();
  }
}
