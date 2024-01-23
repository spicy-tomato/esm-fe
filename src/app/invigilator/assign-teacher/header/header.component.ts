import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ESMDomainEnumsExaminationStatus } from '@esm/api';
import { StringifyHelper } from '@esm/cdk';
import { ArrayPipe } from '@esm/core';
import { MinimumExaminationStatusDirective } from '@esm/shared/directives';
import { LetModule } from '@ngrx/component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiSelectModule } from '@taiga-ui/kit';
import { environment } from 'src/environments/environment';
import { InvigilatorAssignTeacherStore } from '../assign-teacher.store';

export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListModule,
  TuiSelectModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'esm-invigilator-assign-teacher-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LetModule,
    MinimumExaminationStatusDirective,
    ArrayPipe,
    ...TAIGA_UI,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvigilatorAssignTeacherHeaderComponent {
  // INJECTS
  private readonly store = inject(InvigilatorAssignTeacherStore);

  // OUTPUTS
  @Output()
  readonly saveChange = new EventEmitter<void>();

  // PROPERTIES
  readonly stringify = StringifyHelper.idName;
  readonly hideAutoAssign = environment.production;
  readonly ExaminationStatus = ESMDomainEnumsExaminationStatus;
  readonly headerObservables$ = this.store.headerObservables$;

  /**
   * Called when select faculty from input select, only used if user has role `ExaminationDepartmentHead`
   */
  onSelectFaculty(facultyId: string): void {
    this.store.changeFaculty(facultyId);
  }

  autoAssign(): void {
    if (this.hideAutoAssign) return;
    this.store.autoAssign();
  }
}
