import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PropTypes from 'prop-types';
import type { FC } from 'react';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'src/hooks/use-router';
import { paths } from 'src/paths';
import LocalStorageService from 'src/services/LocalStorageService';

interface AccountPopoverProps {
  anchorEl: null | Element;
  onClose?: () => void;
  open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const { signOut } = useAuth();

  const handleLogout = useCallback(async (): Promise<void> => {
    try {
      onClose?.();
      const { deviceId, id } = JSON.parse(LocalStorageService.getAccessToken() ?? '');
      await signOut(deviceId, id ?? '');

      router.push(paths.auth.login);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, onClose]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      disableScrollLock
      onClose={onClose}
      open={!!open}
      PaperProps={{ sx: { width: 170, marginTop: '10px' } }}
      {...other}
    >
      {/* <Box sx={{ p: 2 }}>
        <Typography variant="body1">{user.name}</Typography>
      </Box> */}
      {/* <Divider /> */}
      {/* <Box sx={{ p: 1 }}>
        <ListItemButton
          component={RouterLink}
          href={paths.auth.changePassword}
          onClick={onClose}
          sx={{
            borderRadius: 1,
            px: 1,
            py: 0.5,
          }}
        >
          <ListItemText primary={<Typography variant="body1">Change Password</Typography>} />
        </ListItemButton>
      </Box>
      <Divider sx={{ my: '0 !important', marginX: 2 }} /> */}
      <Box
        sx={{
          display: 'flex',
          p: 1,
          // justifyContent: '',
        }}
      >
        <Button
          color="error"
          onClick={handleLogout}
          size="small"
          fullWidth
        >
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
