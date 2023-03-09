import { hot } from 'jasmine-marbles';
import { from, Observable } from 'rxjs';
import { ObservableHelper } from './observable.helper';

describe('ObservableHelper', () => {
  describe('filterNullish', () => {
    it('should ignore falsy values', () => {
      const obs$ = from([null, undefined, 0, 1]).pipe(
        ObservableHelper.filterNullish()
      );

      Observable;

      const expected = hot('(ab|)', { a: 0, b: 1 });
      expect(obs$).toBeObservable(expected);
    });
  });
});
