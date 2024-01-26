import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LetModule } from '@ngrx/component';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { HomeStore } from './home.store';

export const NGRX = [LetModule];
export const TAIGA_UI = [TuiActionModule, TuiLinkModule, TuiLoaderModule];

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule, ...NGRX, ...TAIGA_UI],
  providers: [HomeStore],
})
export class HomeComponent implements OnInit {
  // INJECT PROPERTIES
  private readonly store = inject(HomeStore);

  // PUBLIC PROPERTIES
  readonly relatedStatus$ = this.store.relatedStatus$;
  readonly relatedExaminations$ = this.store.relatedExaminations$;
  readonly closedExaminations$ = this.store.closedExaminations$;
  readonly closedExaminationsStatus$ = this.store.closedExaminationsStatus$;

  ngOnInit(): void {
    this.store.getClosedExaminations();
  }
}
