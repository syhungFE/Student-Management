import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { authActions } from '../authSlice';
import LoginForm from './LoginForm';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0f4c81',//theme.palette.primary.dark,
    },
    box: {
        backgroundColor: '#fffcf6',
        opacity: 0.9,
        height: '50vh',
        padding: '40px 15px',
        borderRadius: '10px'
    },
    title: {
        textAlign: 'center',
        color: '#0f4c81',
        fontWeight: 500,
    }
}))
export function LoginPage(){
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const isLogging = useAppSelector((state) => state.auth.logging);
    
    const handleStudentFormSubmit = () => {
        // TODO: input username + password of user 
        dispatch(authActions.login({
            username: 'hungnguyen',
            password: '123456'
        }))
    }
    const defaultValues = {
        username: '',
        password: ''
    }
    
    return(
        <div className={classes.root}>
            <Paper elevation={10} className={classes.box}>
                <Typography variant="h4" component="h3" className={classes.title}>
                    Student Management
                </Typography>
                <Box mt={4}>
                    <LoginForm 
                        initialValues={defaultValues} 
                        onSubmit={handleStudentFormSubmit}
                        isLogging={isLogging}    
                    />
                </Box>
            </Paper>
        </div>
    )
}