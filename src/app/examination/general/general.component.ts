import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
} from '@angular/core';
import { WorkflowDialogComponent } from '@esm/shared/dialogs';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogService,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

const TAIGA_UI = [TuiButtonModule];

@Component({
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.less'],
  standalone: true,
  imports: [CommonModule, ...TAIGA_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiButtonOptionsProvider({ size: 'm' })],
})
export class ExaminationGeneralComponent {
  // INJECT PROPERTIES
  private readonly injector = inject(Injector);
  private readonly dialogService = inject(TuiDialogService);

  // PUBLIC METHODS
  openWorkflow(): void {
    this.dialogService
      .open<boolean>(
        new PolymorpheusComponent(WorkflowDialogComponent, this.injector),
        {
          size: 'auto',
        }
      )
      .subscribe();
  }
}
