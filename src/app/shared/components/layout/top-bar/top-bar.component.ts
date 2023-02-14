import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { fadeInOut, StringHelper } from '@esm/core';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { Store } from '@ngrx/store';
import { tuiButtonOptionsProvider } from '@taiga-ui/core';
import { map } from 'rxjs';
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
  animations: [fadeInOut],
})
export class TopBarComponent {
  // INPUT
  @Input() isInCommonPage!: boolean;

  // PUBLIC PROPERTIES
  examinations = [
    'Thi kết thúc học phần kỳ 2 năm học 2022-2023',
    'Thi kết thúc học phần kỳ 1 năm học 2022-2023',
  ];
  selectedExamination = this.examinations[0];
  openExaminationDropdown = false;
  openUserDropdown = false;
  searchExaminationValue = '';

  readonly items = TopBarConstants.items;
  readonly userName$ = this.appStore.pipe(
    AppSelector.notNullUser,
    map(({ fullName }) => StringHelper.getFirstName(fullName))
  );
  readonly userTitle$ = this.appStore.pipe(AppSelector.userTitle(false));

  // CONSTRUCTOR
  constructor(
    @Inject(TOP_BAR_OPTIONS) public readonly options: TopBarOptions,
    private readonly appStore: Store<AppState>
  ) {}

  // PUBLIC METHODS
  onClickExaminationDropdownItem(action: string): void {
    this.selectedExamination = action;
    this.openExaminationDropdown = false;
  }

  onClickUserDropdownItem(action: string): void {
    this.openUserDropdown = false;
    if (action === TopBarConstants.keys.LOG_OUT) {
      this.appStore.dispatch(AppPageAction.logOut());
    }
  }
}
