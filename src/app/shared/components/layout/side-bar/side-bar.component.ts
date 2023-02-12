import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideBarConstant } from './side-bar.constant';

@Component({
  selector: 'esm-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  // PUBLIC PROPERTIES
  items = SideBarConstant.items;

  // CONSTRUCTOR
  // constructor(private readonly router: Router) {}

  // PUBLIC METHODS
  // async onClickItem(item: SidebarItem): Promise<void> {
  //   if (item.routerLink?.includes('calendar')) {
  //     await this.router.navigate(['/calendar']);
  //   }
  // }
}
