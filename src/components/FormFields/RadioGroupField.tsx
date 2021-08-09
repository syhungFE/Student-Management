import { FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup } from '@material-ui/core';
import { Control, useController } from "react-hook-form";

export interface RadioOptions{
    label?: string;
    value: string | number
}
export interface RadioGroupFieldProps{
    name: string;
    label: string;
    control: Control<any>;
    disabled: boolean;
    options: RadioOptions[]
}
export const RadioGroupField = ({name,label,control,disabled,options, ...inputProps}: RadioGroupFieldProps) => {
    const { 
        field: {value, onChange, onBlur},
        fieldState: {invalid, error},
    } = useController({
        name,
        control
    })
    return (
        <FormControl margin="normal" component="fieldset" error={invalid} disabled={disabled}>
            {/* <FormLabel component="legend">{label}</FormLabel> */}

            <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur} >
                {
                    options.map((option) => 
                        <FormControlLabel 
                            key={option.value} 
                            value={option.value} 
                            control={<Radio size="small"/>}
                            label={option.label}
                            style={{ 'flexDirection': 'row' }}
                        />
                    )
                }
            </RadioGroup>
            
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    )
}