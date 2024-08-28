import { Grid, Paper, SelectChangeEvent, Stack, TableContainer } from '@mui/material';
import Table from '@mui/material/Table';
import { ReactNode, memo } from 'react';
import { SortOptions } from 'src/hooks/use-filter';
import TableHead from 'src/components/organisms/table/table-head';
import TableBody from 'src/components/organisms/table/table-body';
import Pagination from 'src/components/organisms/table/pagination';

interface ITableProps {
  name: string;
  onPageChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
  onRowsPerPageChange: (_event: SelectChangeEvent) => void;
  pageNumber: number;
  pageCount: number;
  rows: Array<any>;
  totalCount: number;
  headers: any;
  filters?: () => ReactNode;
  handleSortChange: (sort: SortOptions) => void;
  isFilterEnabled?: boolean;
}

const Listing = (props: ITableProps) => {
  const {
    pageCount,
    totalCount,
    onRowsPerPageChange,
    onPageChange,
    headers,
    rows,
    pageNumber,
    filters,
    handleSortChange,
    isFilterEnabled = true,
  } = props;

  return (
    <Stack
      direction={'column'}
      flexWrap="wrap"
      spacing={3}
    >
      {isFilterEnabled && <Grid container>{filters && filters()}</Grid>}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: '0px' }}
      >
        <Table sx={{ border: '1px solid #e6e6e6' }}>
          <TableHead
            headCells={headers}
            setSortData={handleSortChange}
          />
          <TableBody
            rowsData={rows}
            headCells={headers}
          />
        </Table>

        {isFilterEnabled && (
          <Grid
            item
            xs={12}
          >
            <Pagination
              totalCount={Math.ceil(totalCount / pageCount)}
              totalRows={totalCount}
              size="medium"
              page={pageNumber}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
              entriesTotalCount={pageCount}
            />
          </Grid>
        )}
      </TableContainer>
    </Stack>
  );
};

export default memo(Listing);
