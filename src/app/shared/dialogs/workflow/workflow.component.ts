import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { ExaminationStatus, ExaminationSummary } from '@esm/data';
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
import { WORKFLOW_CONNECTORS, WORKFLOW_NODES } from './workflow.constant';
import { WorkflowDialogStore } from './workflow.store';

@Component({
  selector: 'esm-workflow',
  standalone: true,
  imports: [CommonModule, DiagramModule, LetModule],
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WorkflowDialogStore],
})
export class WorkflowDialogComponent {
  // INJECT PROPERTIES
  private readonly store = inject(WorkflowDialogStore);

  // VIEWCHILD
  @ViewChild('diagram')
  public diagram!: DiagramComponent;

  // PUBLIC PROPERTIES
  readonly examination$ = this.store.examination$;
  readonly constraints = DiagramConstraints.Zoom;
  readonly nodes = WORKFLOW_NODES;
  readonly connectors = WORKFLOW_CONNECTORS;
  readonly snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.All & ~SnapConstraints.ShowLines,
  };

  // PRIVATE PROPERTIES
  private readonly statusMap: Record<ExaminationStatus, string> = {
    '0': '0-idle',
    '1': '1-setup',
    '2': '2-assign-faculty',
    '4': '3-assign-department',
    '8': '4-assign-teacher',
  };

  // PUBLIC METHODS
  created(): void {
    this.diagram.fitToPage();
  }

  getNodeDefaults(
    examination: ExaminationSummary
  ): (node: NodeModel) => NodeModel {
    return (node) => {
      if (node.style) {
        node.style.strokeColor = 'var(--tui-neutral-fill)';
        if (this.statusMap[examination.status] === node.id) {
          node.style.fill = 'var(--tui-success-fill)';
        }
      }
      return node;
    };
  }

  getConnectorDefaults(connector: ConnectorModel): ConnectorModel {
    connector.type = 'Orthogonal';

    if (connector.style) connector.style.strokeColor = 'var(--tui-neutral-fill)';
    if (connector.sourceDecorator?.style) {
      connector.sourceDecorator.style.strokeColor = 'var(--tui-neutral-fill)';
      connector.sourceDecorator.style.fill = 'var(--tui-neutral-fill)';
    }
    if (connector.targetDecorator?.style) {
      connector.targetDecorator.style.strokeColor = 'var(--tui-neutral-fill)';
      connector.targetDecorator.style.fill = 'var(--tui-neutral-fill)';
    }

    return connector;
  }
}
