import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExaminationStatus } from '@esm/data';
import { MinimumExaminationStatusDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { Observable } from 'rxjs';

export const TAIGA_UI = [TuiLinkModule, TuiLoaderModule];

@Component({
  selector: 'esm-safe-examination-data',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LetModule,
    MinimumExaminationStatusDirective,
    ...TAIGA_UI,
  ],
  templateUrl: './safe-examination-data.component.html',
  styleUrls: ['./safe-examination-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SafeExaminationDataComponent {
  // INPUTS
  @Input() minimumStatus: ExaminationStatus = ExaminationStatus.Inactive;
  @Input() getDataFunc: Function = () => null;
  @Input() showLoader: Observable<boolean> | boolean = false;

  // PUBLIC PROPERTIES
  readonly ExaminationStatus = ExaminationStatus;
}
