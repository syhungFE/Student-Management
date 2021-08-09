import { Box, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { Chart, ChartLine, TabsWrapped } from "../../components/Common";
import StatisticItem from "./components/StatisticItem";
import StudentRankingList from "./components/StudentRankingList";
import Widget from "./components/Widget";
import { dashboardActions, selectDashboardLoading, selectGenderbyCityList, selectHighestStudentList, selectLowestStudentList, selectRankingByCityList, selectStatistics } from "./dashboardSlice";

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1)
    },
    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%'
    }
}))

const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const loading =  useAppSelector(selectDashboardLoading);
    const statistics = useAppSelector(selectStatistics);
    const highestStudentList = useAppSelector(selectHighestStudentList);
    const lowestStudentList = useAppSelector(selectLowestStudentList);
    const rankingByCityList = useAppSelector(selectRankingByCityList);
    const genderByCityList = useAppSelector(selectGenderbyCityList);

    useEffect(() => {
        dispatch(dashboardActions.fetchData());

    }, [dispatch]);

    const tabs = [
        {
            'value' : 'bar',
            'label' : 'Bar Chart'
        },
        {
            'value' : 'line',
            'label' : 'Line Chart'
        }
    ]
    const tabPanels = [
        {
            'index':    'bar',
            'value':    'bar',
            'children': <Chart data={genderByCityList}/>
        },
        {
            'index':    'line',
            'value':    'line',
            'children': <ChartLine data={genderByCityList}/>  
        }
    ]
    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading}/>}

            {/* Statistic Section */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3} xl={1}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize='large' color='primary'/>}
                        label='Male'
                        value={statistics.maleCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3} xl={1}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize='large' color='primary'/>}
                        label='Female'
                        value={statistics.femaleCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3} xl={1}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize='large' color='primary'/>}
                        label='Mark >= 8'
                        value={statistics.highMarkCount}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3} xl={1}>
                    <StatisticItem
                        icon={<PeopleAlt fontSize='large' color='primary'/>}
                        label='Mark <= 5'
                        value={statistics.lowMarkCount}
                    />
                </Grid>
            </Grid>
            
            {/* All Students Ranking */}
            <Box mt={5}>
                <Typography variant='h4'> All Students </Typography>
                <Box mt={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3} xl={1}>
                            <Widget title='Highest Student List'>
                                <StudentRankingList studentList={highestStudentList}/>
                            </Widget>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3} xl={1}>
                            <Widget title='Lowest Student List'>
                                <StudentRankingList studentList={lowestStudentList}/>
                            </Widget>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6} xl={1}>
                            {/* <Chart data={genderByCityList}/> */}
                            <TabsWrapped tabs={tabs} tabPanels={tabPanels}/>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            {/* All Students Ranking By City*/}
            <Box mt={5}>
                <Typography variant='h4'> Ranking By City </Typography>
                <Box mt={2}>
                    <Grid container spacing={3}>
                    {
                       rankingByCityList.map((cityList,idx) => {
                           return(
                            <Grid key={cityList.cityId} item xs={12} md={6} lg={3} xl={1}>
                                <Widget title={cityList.cityName}>
                                    <StudentRankingList studentList={cityList.rankingList}/>
                                </Widget>
                            </Grid>
                           )
                       }) 
                    }
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}

export default Dashboard;