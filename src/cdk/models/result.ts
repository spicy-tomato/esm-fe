export class Result<T> {
  data!: T;
  success!: boolean;
  errors!:
    | {
        code?: number;
        message: string;
        property?: string;
      }[]
    | null;
}
