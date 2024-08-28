import { TableCell, TableHead as MUITableHead, TableRow, TableSortLabel } from '@mui/material';
import { ReactNode, memo, useState } from 'react';
import { SortOptions } from 'src/hooks/use-filter';
import { SortDirection } from 'src/types/common';
import { ITableHeader } from 'src/types/table';

interface IHeadCells {
  headCells: ITableHeader[];
  setSortData: (sort: SortOptions) => void;
}

const TableHead = (props: IHeadCells) => {
  const { headCells, setSortData } = props;
  const [sortDirection, setSortDirection] = useState<string>('asc');

  const handleSortDirection = (data: string) => {
    let sortType = sortDirection === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc;
    setSortDirection(sortType);
    setSortData({ sortOrder: sortDirection, sortBy: data });
  };

  return (
    <MUITableHead sx={{ borderBottom: '1px solid #E6E6E6' }}>
      <TableRow>
        {headCells?.map((headCell: any): ReactNode => {
          return !headCell.isSortable === false ? (
            <TableCell
              key={headCell.id}
              width={headCell.width}
            >
              <TableSortLabel
                direction={
                  sortDirection === SortDirection.Desc ? SortDirection.Desc : SortDirection.Asc
                }
                onClick={() => handleSortDirection(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell
              key={headCell.id}
              width={headCell.width}
            >
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </MUITableHead>
  );
};

export default memo(TableHead);
