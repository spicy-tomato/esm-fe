import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInOut } from '@esm/core';
import { LetModule } from '@ngrx/component';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { TuiBadgedContentModule } from '@taiga-ui/kit';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationListComponent } from '../notification-list';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiBadgedContentModule,
  TuiButtonModule,
  TuiHostedDropdownModule,
];

@Component({
  selector: 'esm-bell',
  templateUrl: './bell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, NotificationListComponent, ...NGRX, ...TAIGA_UI],
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'flat',
      shape: 'rounded',
      size: 's',
    }),
  ],
  animations: [fadeInOut],
})
export class BellComponent {
  // PUBLIC PROPERTIES
  readonly hasUnread$ = new Observable();
  readonly show$ = new BehaviorSubject<boolean>(true);
  openDropdown = false;
}
