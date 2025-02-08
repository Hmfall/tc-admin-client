import type { ClassConstructor } from 'class-transformer';
import { plainToInstance } from 'class-transformer';

export function toModel<T>(model: ClassConstructor<T>, response: unknown): T;

export function toModel<T>(model: [ClassConstructor<T>], response: unknown): T[];

export function toModel<T>(
  model: ClassConstructor<T> | [ClassConstructor<T>],
  response: unknown,
): T | T[] {
  if (Array.isArray(model) && Array.isArray(response)) {
    return plainToInstance(model[0], response);
  } else if (!Array.isArray(model) && Array.isArray(response)) {
    return plainToInstance(model, response);
  } else if (Array.isArray(model) && !Array.isArray(response)) {
    return plainToInstance(model[0], response);
  } else {
    return plainToInstance(model as ClassConstructor<T>, response);
  }
}
