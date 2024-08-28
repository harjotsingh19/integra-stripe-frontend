import { FormHelperText } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

type ErrorProps = {
  errorMsg: any;
};
const ErrorMessage = (props: ErrorProps) => {
  const { errorMsg } = props;
  return <FormHelperText error>{errorMsg}</FormHelperText>;
};

export default ErrorMessage;
ErrorMessage.propTypes = {
  errorMsg: PropTypes.string.isRequired,
};
