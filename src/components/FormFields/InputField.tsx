import { TextField } from '@material-ui/core';
import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label: string;
    control: Control<any>;
}
export const InputField = ({name,label,control, ...inputProps}: InputFieldProps) => {
    const { 
        field: {value, onChange, onBlur, ref},
        fieldState: {invalid, error},
    } = useController({
        name,
        control
    })
    return (
        <>
            {/* <InputLabel htmlFor={value}>{label}</InputLabel> */}
            <TextField 
                fullWidth
                margin="normal"
                variant="outlined" 
                size="small"
                id={value as string}
                value={value}
                label={label} 
                onChange={onChange}
                onBlur={onBlur}
                inputRef={ref}
                error={invalid}
                helperText={error?.message}
                inputProps={inputProps}
            />
        </>
        
    )
}