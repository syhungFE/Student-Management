import { Box, makeStyles } from '@material-ui/core';
import Dashboard from 'features/dashboard';
import Student from 'features/student';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: '240px 1fr',
        gridTemplateAreas: '"header header" "sidebar main"'
    },

    header: {
        gridArea: 'header',
        backgroundColor: theme.palette.background.paper,
    },
    sidebar: {
        gridArea: 'sidebar',
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
    },
    main: {
        gridArea: 'main',
        padding: theme.spacing(2,3)
    }
}))
export function AdminLayout(){
    const classes = useStyles();
    
    return(
        <Box className={classes.root}>
            <Box className={classes.header}>
                {/* <Header/> */}
            </Box>
            <Box className={classes.sidebar}>
                {/* <SideBar/> */}
            </Box>
            <Box className={classes.main}>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/admin' component={Dashboard} />
                    <Route path='/admin/students' component={Student} />
                </Switch>
            </Box>
        </Box>
    )
}
