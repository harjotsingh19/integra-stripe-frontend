export type size = 'small' | 'medium' | 'large';
export type color = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
export type variant = 'contained' | 'outlined' | 'text';

export const enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}
export const enum SortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}
export type Size = 'small' | 'medium' | 'large';
export type TOptionsProperties = {
  label: string;
  value: string;
};

export const formattedValues = (data: any, key: string) => {
  return data.map((item: any) => {
    if (typeof item === 'object' && item !== null && key in item) {
      return item[key];
    }
    return item;
  });
};
