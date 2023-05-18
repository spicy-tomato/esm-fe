import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '@esm/shared/components';

@Component({
  selector: 'esm-forbidden',
  standalone: true,
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ErrorComponent],
})
export class ForbiddenComponent {}
