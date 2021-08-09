import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      style={{ 'height' : '300px' }}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));
interface TabProps {
  value: string;
  label: string
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}
export interface TabsWrappedProps{
  tabs: TabProps[];
  tabPanels: TabPanelProps[]
}
export function TabsWrapped({tabs, tabPanels} : TabsWrappedProps) {
  const classes = useStyles();
  const [value, setValue] = React.useState(tabs[0].value);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
          {
            tabs.map((tab) => 
              <Tab
                key={tab.value}
                value={tab.value} label={tab.label}
                wrapped {...a11yProps(tab.value)}
              />
            )
          }
        </Tabs>
      </Box>
      {
        tabPanels.map((panel) => 
          <TabPanel key={panel.value} value={value} index={panel.index}>
            {panel.children}
          </TabPanel>
        )
      }
    </div>
  );
}
