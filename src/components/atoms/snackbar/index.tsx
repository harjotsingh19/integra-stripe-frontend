import React, { memo } from 'react';
import { Snackbar as MUISnackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_CLOSE } from 'src/store/constants/common';
import { rootReducersState } from 'src/store/reducers';
import { SNACKBAR_DURATION } from 'src/config/constants';
import { ISnackbarProperties } from 'src/store/reducers/common/snackbarReducer';

const Snackbar = () => {
  const dispatch = useDispatch();
  const snackBarData = useSelector(
    (state: rootReducersState): ISnackbarProperties => state.snackbar
  );
  const { message, open, severity } = snackBarData ?? {};
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: SNACKBAR_CLOSE });
  };

  return (
    <MUISnackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={SNACKBAR_DURATION}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </MUISnackbar>
  );
};
export default memo(Snackbar);
