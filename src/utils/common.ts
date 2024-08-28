import * as changeCase from 'change-case';

interface IExactMatch {
  status?: number;
}

interface IDateRange {
  start?: string;
  end?: string;
}

interface ISort {
  name?: string;
  price?: string;
  status?: string;
  createdAt?: string;
}

interface ISearch {
  name?: string;
}

interface IPagination {
  page?: number;
  pageSize?: number;
}

interface IQueryString {
  exactMatch?: IExactMatch;
  range?: { date?: IDateRange };
  sort?: ISort;
  search?: ISearch;
  pagination?: IPagination;
}

function handlePagination(pagination: IPagination): string {
  const { page, pageSize } = pagination;
  if (page !== undefined && pageSize !== undefined) {
    return `page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}&`;
  }
  return '';
}

export function generateQueryString(data: IQueryString): string {
  let query = '';

  function buildQuery(obj: any, prefix = '') {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const newPrefix = prefix
          ? `${prefix}[${encodeURIComponent(key)}]`
          : encodeURIComponent(key);
        if (value !== undefined && value !== null) {
          if (typeof value === 'object') {
            buildQuery(value, newPrefix);
          } else {
            query += `${newPrefix}=${encodeURIComponent(value.toString())}&`;
          }
        }
      }
    }
  }

  buildQuery(data);
  return query.slice(0, -1);
}

export const changeKeys = (data: any[], name: string, value: string): any => {
  return data.map((item: any) => ({
    ...item, // Spread the original item's properties
    label: item[name], // Assign the 'name' property to 'label'
    value: item[value], // Assign the 'value' property to 'value'
  }));
};

export const enum FileUploaderStatus {
  InvalidFormat = 'file-invalid-type',
  InvalidSize = 'file-too-large',
}
export const handleFileRejectionError = (error: any): string => {
  switch (error.code) {
    case FileUploaderStatus.InvalidFormat:
      return 'File format should be PNG,JPG,JPEG';
    case FileUploaderStatus.InvalidSize:
      return 'File size should be in between 10KB to 5MB';
    default:
      return '';
  }
};
export const convertToCapitalCase = (value: string = '') => changeCase.capitalCase(value) ?? '--';
