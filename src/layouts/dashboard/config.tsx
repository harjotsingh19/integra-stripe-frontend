import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';

export interface Item {
  disabled?: boolean;
  external?: boolean;
  icon?: ReactNode;
  items?: Item[];
  label?: ReactNode;
  path?: string;
  title: string;
}

export interface Section {
  items: Item[];
  subheader?: string;
}

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.price),
            path: paths.index,
            // icon: (
            //   <Box>
            //     <Dateicon />
            //   </Box>
            // ),
          },
        ],
      },
    ];
  }, [t]);
};
