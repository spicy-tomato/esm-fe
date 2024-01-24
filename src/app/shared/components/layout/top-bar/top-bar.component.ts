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
import { ESMDomainDtosExaminationExaminationSummary } from '@esm/api';
import { fadeInOut } from '@esm/core';
import { GetRelatedResponseItem } from '@esm/data';
import { LetModule } from '@ngrx/component';
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
import { combineLatest, debounceTime, tap } from 'rxjs';
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
  readonly options = inject(TOP_BAR_OPTIONS);

  private readonly cdr = inject(ChangeDetectorRef);
  private readonly store = inject(TopBarStore);
  private readonly router = inject(Router);

  // INPUT
  @Input() isInCommonPage!: boolean;
  @Input() isInCreatePage!: boolean;

  // PUBLIC PROPERTIES
  selectedExamination: ESMDomainDtosExaminationExaminationSummary | null = null;
  searchExaminationValue = '';
  searchValue = '';
  openExaminationDropdown = false;
  openUserDropdown = false;

  readonly items = TopBarConstants.items;
  readonly examination$ = this.store.examination$;
  readonly navObservables$ = this.store.navObservables$;
  readonly examinationStatus$ = this.store.examinationStatus$;

  // IMPLEMENTATIONS
  ngOnInit(): void {
    this.triggerBindCurrentExamination();
  }

  // PUBLIC METHODS
  readonly filter = (item: GetRelatedResponseItem, search: string): boolean =>
    item.name.toLowerCase().includes(search.toLowerCase());

  onClickExaminationDropdownItem(id: string): void {
    this.router.navigateByUrl(`${id}/exam`).catch(() => null);
    this.openExaminationDropdown = false;
  }

  onClickUserDropdownItem(action: string): void {
    this.openUserDropdown = false;
    if (action === TopBarConstants.keys.LOG_OUT) {
      this.store.logOut();
    }
  }

  // PRIVATE METHODS
  private triggerBindCurrentExamination(): void {
    combineLatest([this.examinationStatus$, this.examination$])
      .pipe(
        debounceTime(0),
        tap(({ 1: examination }) => {
          this.selectedExamination = examination;
          this.cdr.markForCheck();
        }),
      )
      .subscribe();
  }
}
