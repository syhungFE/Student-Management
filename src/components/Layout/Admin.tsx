import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dashboard from 'features/dashboard';
import Student from 'features/student';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, SideBar } from '../Common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export function AdminLayout() {
  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen}/>
      <SideBar open={open} handleDrawerClose={handleDrawerClose}/>
      <main
        className={classes.content}
      >
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/admin' component={Dashboard} />
          <Route path='/admin/students' component={Student} />
      </Switch>
      </main>
    </div>
  );
}
