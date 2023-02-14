import { Injectable } from '@angular/core';
import { ObservableHelper } from '@esm/core';
import { AppPageAction, AppSelector, AppState } from '@esm/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';
import { EchoService, NotificationService } from '../services';
import { NotificationApiAction } from './notification.api.actions';
import { NotificationPageAction } from './notification.page.actions';
import { NotificationSelector } from './notification.selectors';
import { NotificationState } from './notification.state';

@Injectable()
export class NotificationEffects {
  // PRIVATE PROPERTIES
  private readonly uuidAccount$ = this.appStore.pipe(
    AppSelector.notNullUser,
    map(({ fullName: userName }) => userName)
  );

  // EFFECTS
  getInitialData$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(NotificationPageAction.getInitialData),
        map(() => {
          NotificationPageAction.actions.forEach((action) => {
            this.store.dispatch(action());
          });
        })
      );
    },
    { dispatch: false }
  );

  // getAll$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(NotificationPageAction.getAll),
  //     withLatestFrom(
  //       this.store.select(NotificationSelector.all).pipe(
  //         map((x) => x.milestone),
  //         ObservableHelper.filterNullish()
  //       ),
  //       this.uuidAccount$
  //     ),
  //     mergeMap(({ 1: milestone, 2: uuidAccount }) => {
  //       return this.notificationService
  //         .getAll(uuidAccount, {
  //           milestone,
  //           limit: 5,
  //         })
  //         .pipe(
  //           map((page) => NotificationApiAction.getAllSuccessful({ page })),
  //           catchError(() => of(NotificationApiAction.getAllFailed()))
  //         );
  //     })
  //   );
  // });

  // getUnread$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(NotificationPageAction.getUnread),
  //     withLatestFrom(
  //       this.store.select(NotificationSelector.unread).pipe(
  //         map((x) => x.milestone),
  //         ObservableHelper.filterNullish()
  //       ),
  //       this.uuidAccount$
  //     ),
  //     mergeMap(({ 1: milestone, 2: uuidAccount }) => {
  //       return this.notificationService
  //         .getUnread(uuidAccount, {
  //           milestone,
  //           limit: 5,
  //         })
  //         .pipe(
  //           map((page) => NotificationApiAction.getUnreadSuccessful({ page })),
  //           catchError(() => of(NotificationApiAction.getUnreadFailed()))
  //         );
  //     })
  //   );
  // });

  markAllAsRead$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(NotificationPageAction.markAllAsRead),
        withLatestFrom(this.uuidAccount$),
        mergeMap(({ 1: uuidAccount }) =>
          this.notificationService.markAllAsRead(uuidAccount)
        )
      );
    },
    { dispatch: false }
  );

  markAsRead$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(NotificationPageAction.markAsRead),
        withLatestFrom(this.uuidAccount$),
        mergeMap(({ 0: { id }, 1: uuidAccount }) =>
          this.notificationService.markAsRead(uuidAccount, id)
        )
      );
    },
    { dispatch: false }
  );

  resetAfterLogout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppPageAction.logOut),
      map(() => NotificationPageAction.reset())
    );
  });

  // CONSTRUCTOR
  constructor(
    private readonly actions$: Actions,
    private readonly echoService: EchoService,
    private readonly notificationService: NotificationService,
    private readonly store: Store<NotificationState>,
    private readonly appStore: Store<AppState>
  ) {
    this.triggerGetInitialData();
    this.handleReceiveEchoMessage();
  }

  // PRIVATE METHODS
  private triggerGetInitialData(): void {
    this.uuidAccount$
      .pipe(
        filter((x) => !!x),
        tap(() => this.store.dispatch(NotificationPageAction.getInitialData()))
      )
      .subscribe();
  }

  private handleReceiveEchoMessage(): void {
    this.echoService.message$
      .pipe(
        tap(({ content }) => {
          if (content) {
            this.store.dispatch(
              NotificationApiAction.add({ notification: content })
            );
          }
        })
      )
      .subscribe();
  }
}
