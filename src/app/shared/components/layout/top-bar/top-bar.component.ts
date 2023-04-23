import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StringHelper } from '@esm/cdk';
import { fadeInOut } from '@esm/core';
import { ExaminationSummary, GetRelatedResponseItem } from '@esm/data';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { LetModule } from '@ngrx/component';
import { Store } from '@ngrx/store';
import {
  TuiActiveZoneModule,
  TuiFilterPipeModule,
  TuiLetModule,
} from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  tuiButtonOptionsProvider,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { map, tap, withLatestFrom } from 'rxjs';
import { BellComponent } from '../../bell';
import { TopBarConstants } from './top-bar.constant';
import { TopBarStore } from './top-bar.store';
import { TOP_BAR_OPTIONS } from './top-bar.token';

const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiActiveZoneModule,
  TuiButtonModule,
  TuiDataListModule,
  TuiFilterPipeModule,
  TuiHostedDropdownModule,
  TuiInputModule,
  TuiLetModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
];

@Component({
  selector: 'esm-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BellComponent,
    ...NGRX,
    ...TAIGA_UI,
  ],
  providers: [
    TopBarStore,
    tuiButtonOptionsProvider({
      appearance: 'icon',
      size: 'm',
    }),
  ],
  animations: [fadeInOut],
})
export class TopBarComponent implements OnInit {
  // INJECT PROPERTIES
  public readonly options = inject(TOP_BAR_OPTIONS);
  private readonly router = inject(Router);
  private readonly store = inject(TopBarStore);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly appStore = inject(Store<AppState>);

  // INPUT
  @Input() isInCommonPage!: boolean;
  @Input() hideCreateButton!: boolean;

  // PUBLIC PROPERTIES
  selectedExamination: ExaminationSummary | null = null;
  searchExaminationValue = '';
  searchValue = '';
  openExaminationDropdown = false;
  openUserDropdown = false;

  readonly items = TopBarConstants.items;
  readonly examinationStatus$ = this.store.examinationStatus$;
  readonly examination$ = this.store.examination$;
  readonly relatedExaminations$ = this.store.relatedExaminations$;
  readonly relatedStatus$ = this.store.relatedStatus$;
  readonly userName$ = this.appStore.pipe(
    AppSelector.notNullUser,
    map(({ fullName }) => StringHelper.getFirstName(fullName))
  );
  readonly userTitle$ = this.appStore.pipe(AppSelector.userTitle(false));

  // IMPLEMENTATIONS
  ngOnInit(): void {
    this.triggerBindCurrentExamination();
  }

  // PUBLIC METHODS
  readonly filter = (item: GetRelatedResponseItem, search: string): boolean =>
    item.name.toLowerCase().includes(search.toLowerCase());

  onClickExaminationDropdownItem(id: string): void {
    this.router.navigateByUrl(`${id}/exam`);
    this.openExaminationDropdown = false;
  }

  onClickUserDropdownItem(action: string): void {
    this.openUserDropdown = false;
    if (action === TopBarConstants.keys.LOG_OUT) {
      this.appStore.dispatch(AppPageAction.logOut());
    }
  }

  // PRIVATE METHODS
  private triggerBindCurrentExamination(): void {
    this.examinationStatus$
      .pipe(
        withLatestFrom(this.examination$),
        tap(({ 1: examination }) => {
          this.selectedExamination = examination;
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }
}
