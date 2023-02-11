import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fadeInOut } from '@esm/core';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'esm-bell',
  templateUrl: './bell.component.html',
  styleUrls: ['./bell.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
