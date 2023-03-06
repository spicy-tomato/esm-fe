import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Status } from '@esm/cdk';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { filter, Observable, tap } from 'rxjs';

@Component({
  selector: 'esm-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less'],
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
