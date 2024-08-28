import React, { memo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { rootReducersState } from 'src/store/reducers';


const Spinner = () => {
  const open = useSelector((state: rootReducersState) => state.customization.isLoader);
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      data-testid='spinner'
    >
      <CircularProgress
        size={50}
        disableShrink
        sx={{ color: 'primary.main' }}
        variant='indeterminate'
      />
    </Backdrop>
  );
};

export default memo(Spinner);
