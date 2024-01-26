import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WorkflowDialogComponent } from '@esm/shared/dialogs';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDialogService,
} from '@taiga-ui/core';
import { TuiIslandModule, TuiProgressModule } from '@taiga-ui/kit';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ExaminationProcessStore } from './general.store';
import { LetModule } from '@ngrx/component';
import {
  ConnectorModel,
  DiagramComponent,
  DiagramConstraints,
  DiagramModule,
  NodeModel,
  SnapConstraints,
  SnapSettingsModel,
} from '@syncfusion/ej2-angular-diagrams';
import { Observable, map } from 'rxjs';

const TAIGA_UI = [
  // TuiButtonModule,
  TuiIslandModule,
  TuiProgressModule,
];

@Component({
  templateUrl: './general.component.html',
  standalone: true,
  imports: [CommonModule, LetModule, ...TAIGA_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    // tuiButtonOptionsProvider({ size: 'm' }),
    ExaminationProcessStore,
  ],
})
export class ExaminationGeneralComponent implements OnInit {
  // // INJECT PROPERTIES
  // private readonly injector = inject(Injector);
  // private readonly dialogService = inject(TuiDialogService);
  // // PUBLIC METHODS
  // openWorkflow(): void {
  //   this.dialogService
  //     .open<boolean>(
  //       new PolymorpheusComponent(WorkflowDialogComponent, this.injector),
  //       {
  //         size: 'auto',
  //       }
  //     )
  //     .subscribe();
  // }

  // INJECT PROPERTIES
  private readonly store = inject(ExaminationProcessStore);

  // PUBLIC PROPERTIES
  startDate = new Date(2023, 5, 1);
  endDate = new Date(2023, 5, 30);
  modulesCount = 100;
  subjectsCount = 1000;
  candidatesCount = 10000;
  invigilatorsCount = 1000;
  readonly status$ = this.store.status$;

  // PRIVATE PROPERTIES
  readonly statistic$ = this.store.data$;

  // CONSTRUCTOR
  constructor() {}

  // LIFECYCLE
  ngOnInit(): void {
    this.store.getStatistic();
  }
}
