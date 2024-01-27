import { Inject, Injectable } from '@angular/core';
import { APP_ENV, AppEnv } from '@esm/core';
import { AppState } from '@esm/store';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { EchoMessage, MessageEvent, messageEvent } from '../models/echo.model';

@Injectable({ providedIn: 'root' })
export class EchoService {
  // PUBLIC PROPERTIES
  // readonly echo: Echo;
  readonly message$ = new BehaviorSubject<{
    event: MessageEvent;
    content: EchoMessage;
  }>(
    {} as {
      event: MessageEvent;
      content: EchoMessage;
    },
  );

  // PRIVATE PROPERTIES
  private channels: string[] = [];

  // CONSTRUCTOR
  constructor(
    @Inject(APP_ENV) env: AppEnv,
    private readonly appStore: Store<AppState>,
  ) {
    // this.echo = new Echo({
    //   broadcaster: 'pusher',
    //   key: env.pusher.key,
    //   cluster: env.pusher.cluster,
    //   encrypted: true,
    //   forceTLS: true,
    // });
    // this.handleUserChange();
  }

  // PUBLIC METHODS
  subscribe(channels: string[]): void {
    messageEvent.forEach(() => {
      channels.forEach(() => {
        // this.echo.channel(channel).listen(e, (data: EchoMessage) => {
        //   data.readAt = null;
        //   this.message$.next({ event: e, content: data });
        // });
      });
      this.channels = channels;
    });
  }

  unsubscribe(): void {
    messageEvent.forEach(() => {
      this.channels.forEach(() => {
        // this.echo.channel(channel).stopListening(e);
      });
    });
    this.channels = [];
  }

  // PRIVATE METHODS
  private handleUserChange(): void {
    // this.appStore
    //   .select(selectTeacher)
    //   .pipe(
    //     tap((teacher) => {
    //       if (teacher) {
    //         this.subscribe(teacher.tags);
    //       } else {
    //         this.unsubscribe();
    //       }
    //     })
    //   )
    //   .subscribe();
  }
}
