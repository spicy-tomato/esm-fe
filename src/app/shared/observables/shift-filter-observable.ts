import { ExaminationGetDataResponseItem } from '@esm/data';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { Observable, combineLatest, map } from 'rxjs';

export type ShiftFilterFilterType = {
  methods: number[];
  date: TuiDayRange | null;
  shifts: number[];
};

export const shiftFilterObservable = (
  data$: Observable<ExaminationGetDataResponseItem[]>,
  filter$: Observable<ShiftFilterFilterType>
) =>
  combineLatest([data$, filter$]).pipe(
    map(([data, { methods, date, shifts }]) =>
      data.filter(({ shiftGroup }) => {
        const startAt = TuiDay.fromUtcNativeDate(new Date(shiftGroup.startAt));
        return (
          // method
          (methods.length === 0 ||
            (shiftGroup.shift && methods.includes(shiftGroup.method))) &&
          // date
          (!date ||
            (date.from.daySameOrBefore(startAt) &&
              startAt.daySameOrBefore(date.to))) &&
          // shift
          (shifts.length === 0 ||
            (shiftGroup.shift && shifts.includes(shiftGroup.shift)))
        );
      })
    )
  );
