import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import * as React from 'react'

export interface StatisticItemProps{
    icon: React.ReactElement;
    label: string;
    value: string | number
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flex: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`
    },
    statisticTitle: {
        display: 'flex',
        flex: 'row nowrap',
    },
    text: {
        margin: '5px 0px 0px 10px'
    }
}))

export default function StatisticItem({icon, label, value} :StatisticItemProps){
    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <Box className={classes.statisticTitle}>
                { icon }
                <Typography variant='h5' className={classes.text}> Students </Typography>
            </Box>

            <Box>
                <Typography variant='h5' align='right'>{value}</Typography>
                <Typography variant='caption' align='right'>{label}</Typography>
            </Box>
        </Paper>
    )
}