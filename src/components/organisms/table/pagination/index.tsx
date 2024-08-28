import { Box, Pagination, SelectChangeEvent } from '@mui/material';
import { memo } from 'react';
import Typography from '@mui/material/Typography';
import SelectInput from 'src/components/atoms/select';
import { paginationOption } from 'src/utils/table';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';

interface IUserData {
  totalCount?: number;
  onRowsPerPageChange: (event: SelectChangeEvent) => void;
  onPageChange?: ((event: React.ChangeEvent<unknown>, page: number) => void) | undefined;
  entriesTotalCount?: number;
  page?: number;
  onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChangeHandler?: (event: SelectChangeEvent) => void;
  size?: string;
  totalRows: number;
}

const AtomPagination = (props: IUserData) => {
  const { t } = useTranslation();
  const { totalCount, onRowsPerPageChange, onPageChange, entriesTotalCount, page, totalRows } =
    props;
  return (
    <>
      <Box sx={{ mt: 1, p: 1 }}>
        <Typography id="rows-label">{/* {t(tokens.labels.totalCount)} : {totalRows} */}</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', p: 1 }}>
          <Typography id="rows-label">Row&apos;s per Page</Typography>

          <Box sx={{ padding: '10px' }}>
            <SelectInput
              name="row-pagination-handler"
              id="row-pagination-handler"
              options={paginationOption}
              onChangeHandler={onRowsPerPageChange}
              onBlurHandler={onRowsPerPageChange}
              disabled={false}
              value={entriesTotalCount as unknown as string}
            />
          </Box>
        </Box>
        <Pagination
          count={totalCount}
          showFirstButton
          onChange={onPageChange}
          size="small"
          page={page}
          shape={'circular'}
          showLastButton
        />
      </Box>
    </>
  );
};

export default memo(AtomPagination);
