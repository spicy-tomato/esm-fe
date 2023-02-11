import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { UserSummary } from '@esm/data';
import { AppPageAction, AppState } from '@esm/store';
import { Store } from '@ngrx/store';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { TopBarConstants } from './top-bar.constant';
import { TopBarOptions, TOP_BAR_OPTIONS } from './top-bar.token';

@Component({
  selector: 'esm-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiButtonOptionsProvider({
      appearance: 'icon',
      size: 'm',
    }),
  ],
})
export class TopBarComponent {
  // PUBLIC PROPERTIES
  readonly items = TopBarConstants.items;
  examinations = [
    'Thi kết thúc học phần kỳ 2 năm học 2022-2023',
    'Thi kết thúc học phần kỳ 1 năm học 2022-2023',
  ];
  selectedExamination = this.examinations[0];
  openExaminationDropdown = false;
  openUserDropdown = false;
  user$: Observable<UserSummary | null> | undefined;

  // CONSTRUCTOR
  constructor(
    @Inject(TOP_BAR_OPTIONS) public readonly options: TopBarOptions,
    private readonly appStore: Store<AppState>
  ) {}

  // PUBLIC METHODS
  onClickExaminationDropdownItem(action: string): void {
    this.openUserDropdown = false;
    if (action === TopBarConstants.keys.LOG_OUT) {
      this.appStore.dispatch(AppPageAction.logOut());
    }
  }

  onClickUserDropdownItem(action: string): void {
    this.openUserDropdown = false;
    if (action === TopBarConstants.keys.LOG_OUT) {
      this.appStore.dispatch(AppPageAction.logOut());
    }
  }
}
