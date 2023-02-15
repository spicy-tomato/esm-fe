import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from '@esm/cdk';
import { CreateExaminationRequest } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';

type TopBarState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class CreateStore extends ComponentStore<TopBarState> {
  // properties
  readonly status$ = this.select((s) => s.status);

  // EFFECTS
  readonly create = this.effect<CreateExaminationRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((param) =>
        this.examinationService.create(param).pipe(
          tapResponse(
            ({ data }) => {
              void this.router.navigateByUrl(`${data.id}/exam`);
            },
            (error) =>
              this.patchState({
                status: 'error',
                error: error as string,
              })
          )
        )
      )
    )
  );

  // CONSTRUCTOR
  constructor(
    private readonly router: Router,
    private readonly examinationService: ExaminationService
  ) {
    super({
      status: 'idle',
      error: null,
    });
  }
}
