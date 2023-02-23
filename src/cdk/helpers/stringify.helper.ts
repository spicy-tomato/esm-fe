import { FacultySummary } from '@esm/data';
import {
  TuiContextWithImplicit,
  tuiPure,
  TuiStringHandler,
} from '@taiga-ui/cdk';

export class StringifyHelper {
  @tuiPure
  static faculty(
    items: FacultySummary[]
  ): TuiStringHandler<TuiContextWithImplicit<string>> {
    const map = new Map(
      items.map(({ id, name }) => [id, name] as [string, string])
    );
    map.set('', 'Tất cả');

    return ({ $implicit }: TuiContextWithImplicit<string>) =>
      map.get($implicit) || '';
  }
}
