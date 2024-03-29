import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExaminationStatus, ExaminationSummary } from '@esm/data';
import { MinimumExaminationStatusDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { Observable } from 'rxjs';

export const TAIGA_UI = [TuiLinkModule, TuiLoaderModule];

@Component({
  selector: 'esm-safe-examination-data',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LetModule,
    PolymorpheusModule,
    MinimumExaminationStatusDirective,
    ...TAIGA_UI,
  ],
  templateUrl: './safe-examination-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeExaminationDataComponent {
  // INPUTS
  @Input() minimumStatus: ExaminationStatus = ExaminationStatus.Closed;
  @Input() getDataFunc: Function = () => null;
  @Input() showLoader: Observable<boolean> | boolean = false;

  // PUBLIC PROPERTIES
  readonly ExaminationStatus = ExaminationStatus;
  readonly context!: {
    $implicit: ExaminationStatus | null;
    status: ExaminationStatus;
    examination: ExaminationSummary;
  };
}
