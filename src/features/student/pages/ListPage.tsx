import { Box, Button, LinearProgress, makeStyles, Typography } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import studentApi from "api/studentApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectCityList, selectCityMap } from "features/city/citySlice";
import { ListParams, Student } from "models";
import { useEffect } from "react";
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from "../studentSlice";

const useStyles = makeStyles((theme) =>({
    root: {
        position: 'relative',
        paddingTop: theme.spacing(1)
    },
    loading: {
        position: 'absolute',
        top: theme.spacing(-1),
        width: '100%'
    },
    titleContainer: {
        display: 'flex',
        flex: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}))
export default function ListPage(){
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const match = useRouteMatch();
    const history = useHistory();

    const studentList = useAppSelector(selectStudentList);
    const loading = useAppSelector(selectStudentLoading);
    const pagination = useAppSelector(selectStudentPagination);
    const filter = useAppSelector(selectStudentFilter);
    const cityMap = useAppSelector(selectCityMap);
    const cityList = useAppSelector(selectCityList);

    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter));
    }, [dispatch,filter]);    

    const handleChange = (e: any, page: number) => {
        dispatch(studentActions.setFilter({
            ...filter,
            _page: page
        }))
    }

    const handleSearchChange = (newFilter: ListParams) =>{
        dispatch(studentActions.setFilterWithDebounce(newFilter));
    }

    const handleFilterChange = (newFilter: ListParams) =>{
        dispatch(studentActions.setFilter(newFilter));
    }

    const handleDeleteClick = async (student: Student) => {
        try {
            // call delete api
            await studentApi.delete(student.id || '');
            // trigger to re-fetch student list with current filter
            const newFilter = {...filter};
            dispatch(studentActions.setFilter(newFilter));
            toast.success(`Delete a student success !!! `);
        } catch (error) {
            // Toast Error
            console.log('Failed to delete selected student', error.message);
        }
    }

    const handleEditStudent = (student: Student) => {
        history.push(`${match.url}/${student.id}`);
    }
    return (
        <Box className={classes.root}>
            {loading && <LinearProgress className={classes.loading}/>}
            <Box className={classes.titleContainer}>
                <Typography variant='h4'> Students </Typography>
                <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained' color='primary'>
                        Add New Student
                    </Button>
                </Link>
            </Box>

            {/* Filter */}
           <Box my={3}>
                <StudentFilters 
                    filter={filter} 
                    cityList={cityList} 
                    onChange={handleFilterChange}
                    onSearchChange={handleSearchChange}
                />
            </Box> 
            {/* Students table */}
            <Box mt={2}>
                <StudentTable 
                    studentList={studentList}
                    cityMap={cityMap}
                    onEdit={handleEditStudent}
                    onDelete={handleDeleteClick}
                />
            </Box>
            {/* Student pagination */}
            <Box mt={2} display='flex' justifyContent='center'>
                <Pagination 
                    variant="outlined" color="primary"
                    count={Math.ceil(pagination._totalRows/pagination._limit)} 
                    page={pagination._page} 
                    onChange={handleChange} 
                />
            </Box>
        </Box>
    );
}