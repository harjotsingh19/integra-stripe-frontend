import React, { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, SvgIcon, SxProps } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
// import Delicon from 'public/assets/images/delicon.svg';
import Delicon from 'public/assets/images/delete.svg';
// ----------------------------------------------------------------------

interface DownloadButtonProps {
  onDownload: () => void;
  sx: SxProps;
}

const DownloadButton: FC<DownloadButtonProps> = ({ onDownload, sx }) => {
  const theme = useTheme();

  return (
    <IconButton
      disableRipple
      onClick={onDownload}
      sx={{
        p: 0,
        top: 0,
        right: 0,
        width: 1,
        height: 1,
        zIndex: 9,
        opacity: 0,
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        borderRadius: 'unset',
        justifyContent: 'center',
        // bgcolor: 'grey.800',
        color: 'common.white',
        transition: theme.transitions.create(['opacity']),
        '&:hover': {
          // opacity: 0.91,
          // bgcolor: theme.palette.grey[900],
          opacity: 1, // Full opacity on hover
          bgcolor: 'rgba(0, 0, 0, 0.4)',
        },

        ...sx,
      }}
    >
      <Box
        sx={{
          // p: 1.2,
          // backgroundColor: theme.palette.common.white,

          ...sx,
          color: theme.palette.common.black,
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {/* <Delicon sx={{ height: '12px', width: '12px', fontSize: '4px' }} /> */}
        <Delicon />
      </Box>
    </IconButton>
  );
};

DownloadButton.propTypes = {
  onDownload: PropTypes.func.isRequired,
};

export default DownloadButton;
