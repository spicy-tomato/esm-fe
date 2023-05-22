import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ExaminationStatus } from '@esm/data';
import { SafeExaminationDataComponent } from '@esm/shared/components';
import { LetModule } from '@ngrx/component';
import { tuiButtonOptionsProvider, TuiLoaderModule } from '@taiga-ui/core';
import { Subscription } from 'rxjs';
import { ExaminationHandoverStore } from './handover.store';
import { ExaminationHandoverTableComponent } from './table/table.component';

export const TAIGA_UI = [TuiLoaderModule];

@Component({
  templateUrl: './handover.component.html',
  styleUrls: ['./handover.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [
    ExaminationHandoverStore,
    tuiButtonOptionsProvider({
      appearance: 'secondary',
      size: 's',
    }),
  ],
  imports: [
    CommonModule,
    LetModule,
    ExaminationHandoverTableComponent,
    SafeExaminationDataComponent,
    TAIGA_UI,
  ],
})
export class ExaminationHandoverComponent {
  // INJECT PROPERTIES
  private readonly store = inject(ExaminationHandoverStore);

  // PUBLIC PROPERTIES
  readonly ExaminationStatus = ExaminationStatus;
  readonly dataStatus$ = this.store.dataStatus$;

  // PUBLIC METHODS
  readonly getDataFunc = (): Subscription => this.store.getData();
}
