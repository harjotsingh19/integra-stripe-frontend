import type { FC, SyntheticEvent } from 'react';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { Tip } from 'src/components/tip';
import { wait } from 'src/utils/wait';

type Article = {
  description: string;
  title: string;
  path: string;
};

const articles: Record<string, Article[]> = {
  Platform: [
    {
      description:
        'Provide your users with the content they need, exactly when they need it, by building a next-level site search experience using our AI-powered search API.',
      title: 'Level up your site search experience with our hosted API',
      path: 'Users / Api-usage',
    },
    {
      description:
        'Algolia is a search-as-a-service API that helps marketplaces build performant search experiences at scale while reducing engineering time.',
      title: 'Build performant marketplace search at scale',
      path: 'Users / Api-usage',
    },
  ],
  Resources: [
    {
      description: 'Algolia’s architecture is heavily redundant, hosting every application on …',
      title: 'Using NetInfo API to Improve Algolia’s JavaScript Client',
      path: 'Resources / Blog posts',
    },
    {
      description:
        'Algolia is a search-as-a-service API that helps marketplaces build performant search experiences at scale while reducing engineering time.',
      title: 'Build performance',
      path: 'Resources / UI libraries',
    },
  ],
};

interface SearchDialogProps {
  onClose?: () => void;
  open?: boolean;
}

export const SearchDialog: FC<SearchDialogProps> = (props) => {
  const { onClose, open = false, ...other } = props;
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayArticles, setDisplayArticles] = useState<boolean>(false);

  const handleSubmit = useCallback(async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    setDisplayArticles(false);
    setIsLoading(true);
    // Do search here
    await wait(1500);
    setIsLoading(false);
    setDisplayArticles(true);
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      {...other}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Typography variant="h6">Search</Typography>
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <SvgIcon>
            <XIcon />
          </SvgIcon>
        </IconButton>
      </Stack>
    </Dialog>
  );
};

SearchDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
