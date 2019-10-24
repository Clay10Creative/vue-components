import { VueConstructor } from "vue";

export interface Formatter<T> {
  to(value: T): string;
  from(value: string): T;
}

export type FormatterFn<T = any> = (...args: any[]) => Formatter<T>;

export interface Formatters {
  [key: string]: FormatterFn;
}

export interface IComponents {
  [key: string]: VueConstructor<any>;
}
