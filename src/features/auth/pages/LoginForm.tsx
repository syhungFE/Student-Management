import { Box, Button, CircularProgress, makeStyles } from '@material-ui/core';
import { User } from 'models';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../components/FormFields';
import { LoginPayload } from '../authSlice';


export interface LoginFormProps{
    initialValues?: LoginPayload,
    onSubmit?: (formValues: LoginPayload) => void,
    isLogging: boolean
}

const useStyles = makeStyles((theme) => ({
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
    },
    submitBox: {
        display: 'flex',
        justifyContent: 'center',
    },
    btnSubmit: {
        width: '50%',
        backgroundColor: theme.palette.primary.dark,
        borderRadius: '20px',
        fontSize:'1.2rem',
        fontWeight: 900,
    }
}));

export default function LoginForm({onSubmit, initialValues, isLogging}: LoginFormProps){
    const classes = useStyles();
    const {
        control
        ,handleSubmit
        ,formState: {isSubmitting}
    } = useForm<User>({
        defaultValues: initialValues
    })

    const handleFormSubmit = async (formValues: LoginPayload) => {
        try {
            await onSubmit?.(formValues);
        } catch (error) {
            console.log('Failed to add/update a student',error.message);
        }
    }

    return(
            <Box maxWidth={300} className={classes.formContainer}>
                <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
                    <InputField name="username" label="User Name" control={control}/>
                    
                    <InputField type="password" name="password" label="Password" control={control}/>
                    
                    <Box mt={5} className={classes.submitBox}>
                        <Button type="submit" fullWidth variant="contained" color='primary' className={classes.btnSubmit} disabled={isSubmitting}> 
                            {isLogging && <CircularProgress size={16} color="secondary"/>}
                            &nbsp;
                            Login
                        </Button>
                    </Box>
                </form>
            </Box>
    )
}