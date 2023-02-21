import { Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { CreateRoomRequest } from '@esm/data';
import { RoomService } from '@esm/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';

type AddRoomDialogState = {
  data: CreateRoomRequest[];
  status: Status[];
  error: (string | null)[];
};

@Injectable()
export class AddRoomDialogStore extends ComponentStore<AddRoomDialogState> {
  readonly data$ = this.select((s) => s.data);
  readonly status$ = this.select((s) => s.status);
  readonly error$ = this.select((s) => s.error);

  // EFFECTS
  readonly init = this.effect<string[]>((params$) =>
    params$.pipe(
      tap((rooms) => {
        const roomsCount = rooms.length;
        this.patchState({
          data: rooms.map((r) => ({ displayId: r, capacity: null })),
          status: new Array(roomsCount).fill('idle'),
          error: new Array(roomsCount).fill(null),
        });
      })
    )
  );

  readonly create = this.effect<{ rowId: number; params: CreateRoomRequest }>(
    (params$) =>
      params$.pipe(
        tap(({ rowId }) =>
          this.patchState((state) => ({
            status: state.status.map((v, i) => (i === rowId ? 'loading' : v)),
            error: state.error.map((v, i) => (i === rowId ? null : v)),
          }))
        ),
        switchMap(({ rowId, params }) =>
          this.roomService.create(params).pipe(
            tapResponse(
              () => {
                this.patchState((state) => ({
                  status: state.status.map((v, i) =>
                    i === rowId ? 'success' : v
                  ),
                  error: state.error.map((v, i) => (i === rowId ? null : v)),
                }));
              },
              (error) =>
                this.patchState((state) => ({
                  status: state.status.map((v, i) =>
                    i === rowId ? 'error' : v
                  ),
                  error: state.error.map((v, i) =>
                    i === rowId ? (error as string) : v
                  ),
                }))
            )
          )
        )
      )
  );

  readonly remove = this.effect<number>((params$) =>
    params$.pipe(
      tap((index) =>
        this.patchState((state) => ({
          status: state.status.filter((_, i) => i !== index),
          error: state.error.filter((_, i) => i !== index),
        }))
      )
    )
  );

  // CONSTRUCTOR
  constructor(private readonly roomService: RoomService) {
    super({
      data: [],
      status: [],
      error: [],
    });
  }
}
