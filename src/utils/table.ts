import { TRemoveEmptyKeys, paginationOptions } from 'src/types/table';
import { endOfDay, formatISO } from 'date-fns';

export const removeEmptyKeys = async <T extends Record<string, any>>(
  obj: T
): Promise<TRemoveEmptyKeys<T>> => {
  const result: any = {} as TRemoveEmptyKeys<T>;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
        if (typeof obj[key] === 'object') {
          const cleanedSubObject = await removeEmptyKeys(obj[key]);
          if (Object.keys(cleanedSubObject).length > 0) {
            result[key] = cleanedSubObject;
          }
        } else {
          result[key] = obj[key] as TRemoveEmptyKeys<T>[keyof T];
        }
      }
    }
  }

  return result;
};

export const paginationOption = [
  { label: '10', value: paginationOptions.Ten },
  { label: '20', value: paginationOptions.Twenty },
  { label: '30', value: paginationOptions.Thirty },
  { label: '40', value: paginationOptions.Forty },
];

export const formatToISO = (date: Date | null) => {
  return date ? formatISO(date) : '';
};
