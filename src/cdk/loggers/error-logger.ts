export class ErrorLogger {
  public static notNullOrEmpty<T>(
    value: T | null | undefined,
    tag: string,
    valueType: string,
  ): T {
    if (!value) {
      throw new Error(`[${tag}] ${valueType} should not be null or undefined`);
    }
    return value;
  }
}
