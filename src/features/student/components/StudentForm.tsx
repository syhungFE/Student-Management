import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { useAppSelector } from "app/hooks";
import { selectCityOptions } from "features/city/citySlice";
import { Student } from "models";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { InputField, RadioGroupField, SelectField } from '../../../components/FormFields';

export interface StudentFormProps{
    initialValues?: Student,
    onSubmit?: (formValues: Student) => void
}

const useStyles = makeStyles((theme) => ({
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto'
    },
}));
export default function StudentForm({initialValues,onSubmit}: StudentFormProps){
    const classes = useStyles();
    const cityOptions = useAppSelector(selectCityOptions);
    const schema = yup.object().shape({
        name: yup.string().required('Please enter Name'),
        gender: yup.string()
                    .oneOf(['male', 'female', 'Please select either Male or Female'])
                    .required('Please enter Gender'),
        age: yup.number()
                .positive('Please enter a positive number.')
                .min(18)
                .integer('Please enter an integer.')
                .required('Please enter Age')
                .typeError('Please enter a valid number.'),
        mark: yup.number()
                .positive('Please enter a positive number.')
                .min(0)
                .max(10)
                .required('Please enter Mark')
                .typeError('Please enter a valid number.'),
        city: yup.string().required('Please enter City')
    })
    const {
        control,
        handleSubmit,
        formState: {isSubmitting}
    } = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues: Student) => {
        try {
            await onSubmit?.(formValues);
        } catch (error) {
            console.log('Failed to add/update a student',error.message);
        }
    }

    return(
        <Box maxWidth={500} className={classes.formContainer}>
            <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
                <InputField name="name" label="Full Name" control={control}/>
                <RadioGroupField 
                    name="gender" label="Gender" control={control} 
                    options={[
                        {label: 'Male' , value: 'male'},
                        {label: 'Female' , value: 'female'}
                    ]} 
                    disabled={false}
                />
                <InputField name="age" label="Age" control={control} type="number"/>
                <InputField name="mark" label="Mark" control={control} type="number"/>
                { Array.isArray(cityOptions) && cityOptions.length > 0 &&
                    <SelectField 
                        name="city" label="City" control={control} 
                        options={cityOptions} disabled={false}
                    />
                }
                <Box mt={3} textAlign='right'>
                    <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}> 
                        {isSubmitting && <CircularProgress size={16 } color="secondary"/>}
                        &nbsp; Save 
                    </Button>
                </Box>
            </form>
        </Box>
    )
};