import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExaminationDocumentComponent {}
