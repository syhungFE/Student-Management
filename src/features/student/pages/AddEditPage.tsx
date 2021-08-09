import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';

export default function AddEditPage(){
    const {studentId} = useParams<{studentId: string}>();
    const isEdit = Boolean(studentId);
    const [student, setStudent] = useState<Student>();
    const history = useHistory();

    useEffect(() => {
        if(!studentId) return; 

        // IFFE
        (async () => {
            try {
              const data: Student = await studentApi.getById(studentId);  
              setStudent(data);
            } catch (error) {
                console.log('Failed to fetch student info', error.message);
            }
        })();
        
    }, [studentId]);

    const initialValues: Student = {
        name: '',
        age: '',
        gender: 'male',
        mark: '',
        city: '',
        ...student
    } as Student
    
    const handleStudentFormSubmit = async (formValues: Student) => {
        // Handle submit here, call api to add/update a student
        if(!isEdit){
            await studentApi.add(formValues);
        }else{
            await studentApi.update(formValues);
        }
        // Toast success
        toast.success(`${isEdit ? 'Update': 'Add'} a student success !!! `);
        // redirect to student list page
        history.push('/admin/students');
    };
    return(
        <Box>
            <Link to='/admin/students' style={{ textDecoration: 'none'  }}>
                <Typography 
                    variant='caption' 
                    style={{ display: 'flex', alignItems: 'center'}}>
                    <ChevronLeft/> Back to list
                </Typography>
            </Link>
            <Typography variant='h5'> 
                { (!isEdit)  ? 'Add new student ': 'Update student info' }
            </Typography>
            {(!isEdit || Boolean(student)) &&
                <Box mt={3}>
                    <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit}/>
                </Box>
            }
        </Box>
    ) 
}