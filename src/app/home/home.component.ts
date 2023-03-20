import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { HomeStore } from './home.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiActionModule, TuiLinkModule];

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, ...NGRX, ...TAIGA_UI],
  providers: [HomeStore],
})
export class HomeComponent {
  // PUBLIC PROPERTIES
  readonly relatedStatus$ = this.homeStore.relatedStatus$;
  readonly relatedExaminations$ = this.homeStore.relatedExaminations$;

  // CONSTRUCTOR
  constructor(private readonly homeStore: HomeStore) {}
}
