type Item<K extends number | string, V> = {
  id: K;
  value: V;
};

export class ArrayHelper {
  static last<T>(arr: T[]): T {
    return arr[arr.length - 1];
  }
}
