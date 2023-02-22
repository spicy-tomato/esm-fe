import { Injectable } from '@angular/core';
import { Status } from '@esm/cdk';
import { CreateFacultyRequest } from '@esm/data';
import { FacultyService } from '@esm/services';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { switchMap, tap } from 'rxjs';

type EditFacultyDialogState = {
  status: Status;
  error: string | null;
};

@Injectable()
export class EditFacultyDialogStore extends ComponentStore<EditFacultyDialogState> {
  // PUBLIC PROPERTIES
  readonly status$ = this.select((s) => s.status);
  readonly error$ = this.select((s) => s.error);

  // EFFECTS
  readonly create = this.effect<CreateFacultyRequest>((params$) =>
    params$.pipe(
      tap(() => this.patchState({ status: 'loading', error: null })),
      switchMap((param) =>
        this.facultyService.createFaculty(param).pipe(
          tapResponse(
            () => {
              this.patchState({ status: 'success' });
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
  constructor(private readonly facultyService: FacultyService) {
    super({
      status: 'idle',
      error: null,
    });
  }
}
