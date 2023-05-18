import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorComponent } from '@esm/shared/components';

@Component({
  selector: 'esm-not-found',
  standalone: true,
  imports: [CommonModule, ErrorComponent],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
