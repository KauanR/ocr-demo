import TextField from '@mui/material/TextField'
import { useField } from 'formik'

const TextFieldWrapper = ({name = '', showErrorMsg = true, ...otherProps}) => {
    const [field, control] = useField(name)

    const fieldConfig: any = {
        ...field,
        ...otherProps
    }

    if(control && control.touched && control.error) {
        fieldConfig.error = true
        fieldConfig.helperText = showErrorMsg && control.error
    }

    return (
        <TextField {...fieldConfig} />
    )
}

export default TextFieldWrapper