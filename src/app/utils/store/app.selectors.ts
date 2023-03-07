import { ObservableHelper } from '@esm/cdk';
import { DepartmentSummary, FacultySummary } from '@esm/data';
import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { map, Observable, pipe, UnaryFunction } from 'rxjs';
import { appFeatureKey } from './app.reducer';
import { AppState } from './app.state';

export class AppSelector {
  private static readonly selector =
    createFeatureSelector<AppState>(appFeatureKey);

  static readonly user = createSelector(this.selector, (state) => state.user);
  static readonly notNullUser = pipe(
    select(this.user),
    ObservableHelper.filterNullish()
  );
  static readonly userStatus = createSelector(
    this.selector,
    (state) => state.userStatus
  );
  static readonly role = createSelector(
    this.selector,
    (state) => state.user?.role
  );

  static readonly userTitle = (
    useTitleCase = true
  ): UnaryFunction<Observable<object>, Observable<string>> =>
    pipe(
      this.notNullUser,
      map(({ isMale }) => {
        let title = isMale ? 'Thầy' : 'Cô';
        if (!useTitleCase) {
          title = title.toLocaleLowerCase();
        }
        return title;
      })
    );

  static readonly showLoader = createSelector(
    this.selector,
    this.userStatus,
    ({ showLoader: userShowLoader }, status) => {
      if (userShowLoader !== null) {
        return userShowLoader;
      }
      return status === 'idle' || status === 'loading';
    }
  );

  static readonly examinationStatus = createSelector(
    this.selector,
    (state) => state.examinationStatus
  );

  static readonly examinationId = createSelector(
    this.selector,
    (state) => state.examinationId
  );

  static readonly examination = createSelector(
    this.selector,
    (state) => state.examination
  );

  static readonly relatedExaminationsStatus = createSelector(
    this.selector,
    (state) => state.relatedExaminationsStatus
  );

  static readonly relatedExaminations = createSelector(
    this.selector,
    (state) => state.relatedExaminations
  );

  static readonly departmentsStatus = createSelector(
    this.selector,
    (state) => state.departmentsStatus
  );

  static readonly facultiesWithDepartment = createSelector(
    this.selector,
    (state) => state.departments
  );

  static readonly faculties = createSelector(this.selector, (state) =>
    state.departments.map((f) => {
      const { departments, ...rest } = f;
      return rest as FacultySummary;
    })
  );

  static readonly departmentsWithFaculty = createSelector(
    this.selector,
    (state) =>
      state.departments.reduce((acc, curr) => {
        acc = [
          ...acc,
          ...curr.departments.map((f) => {
            const { departments, ...faculty } = curr;
            return { ...f, faculty };
          }),
        ];
        return acc;
      }, [] as DepartmentSummary[])
  );
}
