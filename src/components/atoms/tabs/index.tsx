/* eslint-disable react-hooks/exhaustive-deps */
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TabsClasses } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { SyntheticEvent, forwardRef, memo, useImperativeHandle, useState } from 'react';

export type TTabsOptions = {
  label: string;
  value: string | number;
};
interface ITabsProps {
  options: TTabsOptions[];
  disabled?: boolean;
  classes?: Partial<TabsClasses>;
  setCurrentTab?: (value: string) => void;
  children: any;
  setValue?: any;
  value: string;
}
const Tabs = (props: ITabsProps, ref: any) => {
  const { options, disabled, classes, setCurrentTab, children, setValue, value } = props;
  // const [value, setValue] = useState<any>(TAB_DEFAULT_VALUE);
  const handleChange = (_event: SyntheticEvent, newValue: string | number) => {
    setValue(newValue);
    setCurrentTab && setCurrentTab(newValue as string);
  };
  useImperativeHandle(ref, () => ({
    // handleClickOpen: handleClickOpen
    handleChange,
  }));
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={handleChange}
            aria-label="tabs"
            classes={classes}
          >
            {options.map((item: TTabsOptions) => (
              <Tab
                key={item.value}
                label={item.label}
                value={item.value}
                disabled={disabled}
              />
            ))}
          </TabList>
        </Box>
        <TabPanel
          value={value}
          key={value}
          sx={{ padding: 0 }}
        >
          {children}
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default memo(forwardRef(Tabs));
