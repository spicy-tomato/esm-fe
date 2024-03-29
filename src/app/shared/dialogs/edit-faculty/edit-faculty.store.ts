import { inject, Injectable } from '@angular/core';
import { ErrorResult, EsmHttpErrorResponse, Status } from '@esm/cdk';
import { EditFacultyRequest } from '@esm/data';
import { FacultyService } from '@esm/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';

type EditFacultyDialogState = {
  status: Status;
  errors: ErrorResult[] | null;
};

@Injectable()
export class EditFacultyDialogStore extends ComponentStore<EditFacultyDialogState> {
  // INJECT PROPERTIES
  private readonly facultyService = inject(FacultyService);

  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.status);
  readonly errors$ = this.select((s) => s.errors);

  // EFFECTS
  readonly create = this.effect<EditFacultyRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', errors: null })),
      switchMap((param) =>
        this.facultyService.create(param).pipe(
          tapResponse(
            () => {
              this.patchState({ status: 'success' });
            },
            (res: EsmHttpErrorResponse) =>
              this.patchState({
                status: 'error',
                errors: res.error.errors,
              })
          )
        )
      )
    )
  );

  readonly update = this.effect<{ id: string; request: EditFacultyRequest }>(
    (params$) =>
      params$.pipe(
        tap(() => this.patchState({ status: 'loading', errors: null })),
        switchMap(({ id, request }) =>
          this.facultyService.update(id, request).pipe(
            tapResponse(
              () => {
                this.patchState({ status: 'success' });
              },
              (res: EsmHttpErrorResponse) =>
                this.patchState({
                  status: 'error',
                  errors: res.error.errors,
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
      errors: null,
    });
  }
}
