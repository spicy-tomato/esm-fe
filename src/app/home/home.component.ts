import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeStore } from './home.store';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HomeStore],
})
export class HomeComponent {
  readonly relatedStatus$ = this.homeStore.relatedStatus$;
  readonly relatedExaminations$ = this.homeStore.relatedExaminations$;

  // CONSTRUCTOR
  constructor(private readonly homeStore: HomeStore) {}
}
