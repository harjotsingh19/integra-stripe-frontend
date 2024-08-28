export type TRemoveEmptyKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends null | undefined | ''
      ? never
      : TRemoveEmptyKeys<T[K]>
    : T[K] extends null | undefined | ''
    ? never
    : T[K];
};
export interface ITableHeader {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
  isField?: string;
  width?: string;
  isSortable?: boolean;
}

export interface ITableHeadProperties {
  order: string;
  orderBy: string;
  handleRequestSort: (
    event: React.MouseEvent<HTMLElement>,
    property: string,
    fieldType: string
  ) => void;
  headCells: ITableHeader[];
}

export const enum paginationOptions {
  Ten = 10,
  Twenty = 20,
  Thirty = 30,
  Forty = 40,
}
export interface IContextMenuLinksProps {
  to: string;
  title: string;
  icon: React.ReactNode;
  show: boolean | null;
  handleClick: () => void;
}
