import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from '@esm/cdk';
import { CreateExaminationRequest } from '@esm/data';
import { ExaminationService } from '@esm/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';

type ExaminationCreateState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class ExaminationCreateStore extends ComponentStore<ExaminationCreateState> {
  // INJECT PROPERTIES
  private readonly router = inject(Router);
  private readonly examinationService = inject(ExaminationService);

  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.status);

  // EFFECTS
  readonly create = this.effect<CreateExaminationRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((param) =>
        this.examinationService.create(param).pipe(
          tapResponse(
            ({ data }) => this.router.navigateByUrl(`${data.id}/exam/data`),
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
  constructor() {
    super({
      status: 'idle',
      error: null,
    });
  }
}
