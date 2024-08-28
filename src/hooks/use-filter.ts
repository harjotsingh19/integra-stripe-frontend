import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from 'src/config/constants';
import { SortBy, SortDirection } from 'src/types/common';

export interface IFilterProperties {
  page: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  searchBy: string;
  status: string;
  fromDate: Date | null;
  toDate: Date | null;
  type?: string;
  [key: string]: any;
  membership: string;
}
export interface SortOptions {
  sortBy: string;
  sortOrder: string;
}
export type HandleSortChangeCallback = (sort: SortOptions) => void;

export const useFilter = () => {
  const [filterData, setFilterData] = useState<IFilterProperties>({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_ROWS_PER_PAGE,
    sortBy: SortBy.CREATED_AT,
    sortDir: SortDirection.Desc,
    searchBy: '',
    status: '',
    type: '',
    fromDate: null,
    toDate: null,
    teamLevel: '',
    membership: '',
  });

  const handleSortChange = useCallback((sort: SortOptions): void => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      sortBy: sort.sortBy,
      sortDir: sort.sortOrder,
    }));
  }, []);

  const handlePageChange = useCallback((_event: any, page: number): void => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      page,
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((event: SelectChangeEvent): void => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      page: DEFAULT_PAGE,
      pageSize: parseInt(event.target.value, DEFAULT_ROWS_PER_PAGE),
    }));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData((prevState: any) => ({
      ...prevState,
      page: DEFAULT_PAGE,
      searchBy: event.target.value,
    }));
  };
  // const handleDateChange = (data: Date | null, date: Date | null) => {
  //   setFilterData((prevState: IFilterProperties) => ({
  //     ...prevState,
  //     page: DEFAULT_PAGE,
  //     fromDate: data,
  //   }));
  // };

  const handleDateChange = (date: Date | null, dateType: 'fromDate' | 'toDate') => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      page: DEFAULT_PAGE,
      [dateType]: date,
    }));
  };

  const handleChange = (event: any) => {
    setFilterData((prevState: IFilterProperties) => ({
      ...prevState,
      page: DEFAULT_PAGE,
      [event.target.name]: event.target.value,
    }));
  };

  const handleReset = () => {
    setFilterData(() => ({
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_ROWS_PER_PAGE,
      sortBy: SortBy.CREATED_AT,
      sortDir: SortDirection.Desc,
      searchBy: '',
      status: '',
      type: '',
      fromDate: null,
      toDate: null,
      teamLevel: '',
      membership: '',
    }));
  };

  return {
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    handleSearch,
    handleDateChange,
    handleChange,
    handleReset,
    filterData,
  };
};
