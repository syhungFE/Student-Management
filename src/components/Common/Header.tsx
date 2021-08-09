import { createStyles, IconButton, makeStyles, Theme } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { useAppDispatch } from 'app/hooks';
import clsx from 'clsx';
import { authActions } from 'features/auth/authSlice';
import React from 'react';

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: 36,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }),
);

export interface HeaderProps{
  open: boolean;
  handleDrawerOpen: any;
}
export function Header({open,handleDrawerOpen}: HeaderProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
      dispatch(authActions.logout());
  }
  return (
    <AppBar position="fixed"  
        className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}>
      <Toolbar>
      <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Student Management
        </Typography>
        <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}