import { FormControl, MenuItem, Select, InputLabel, FormHelperText } from '@material-ui/core';
import { Control, useController } from "react-hook-form";

export interface SelectOptions{
    label?: string;
    value: string | number
}
export interface SelectFieldProps{
    name: string;
    label: string;
    control: Control<any>;
    disabled: boolean;
    options: SelectOptions[]
}
export const SelectField = ({name,label,control,disabled,options, ...inputProps}: SelectFieldProps) => {
    const { 
        field: {value, onChange, onBlur},
        fieldState: {invalid, error},
    } = useController({
        name,
        control
    })
    return (
        <FormControl fullWidth margin="normal" variant="outlined" size='small' error={invalid} disabled={disabled}>
          <InputLabel id={`${name}_label`}>{label}</InputLabel>
          <Select
            labelId={`${name}_label`}
            label={label}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          >
            {
              options.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))
            }
          </Select>

          <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    )
}