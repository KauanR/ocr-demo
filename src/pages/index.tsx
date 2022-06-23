import { Button, Card, CardContent, FormControl, InputAdornment, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { NextPage } from 'next'
import styles from './styles.module.scss'
import LinkIcon from '@mui/icons-material/Link'
import { useState } from 'react'
import ImgCheck, { ImgCheckProps } from '../components/ImgCheck'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import TextField from '../components/TextField'

const Home: NextPage = () => {

    const [images, setImages] = useState([] as ImgCheckProps[])

    function addImage(values: any): void {
        const newImage: ImgCheckProps = {
            key: new Date().toISOString(),
            number: images.length + 1,
            language: values.lang,
            url: values.url
        }

        setImages(curValue => [...curValue, newImage])
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.head}>
                <Typography variant='h3'>
                    Tesseract OCR Demo
                </Typography>
            </div>

            <Card className={styles.inputCard}>
                <CardContent>
                    <Typography variant='body2'>
                        Antes de tudo, forneça uma URL de imagem na caixa de texto abaixo, selecione a linguagem do texto e confirme a operação. 
                        Com isso feito, o texto contido na imagem poderá ser convertido para texto puro logo abaixo.
                    </Typography>
                </CardContent>

                <Formik
                    initialValues={{
                        url: '',
                        lang: 'por'
                    }}
                    validationSchema={
                        Yup.object().shape({
                            url: Yup.string().required('A URL é obrigatória').matches(/^(ftp|http|https):\/\/[^ "]+$/, 'Deve ser uma URL válida'),
                            lang: Yup.string().required()
                        })
                    }
                    validateOnBlur={true}
                    validateOnMount={true}
                    onSubmit={addImage}
                >
                    {formProps => (
                        <Form className={styles.actions}>
                            <div className={styles.inputs}>
                                <TextField
                                    id='url'
                                    name='url'
                                    label='URL'
                                    helperText=' '
                                    className={styles.urlField}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <LinkIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <FormControl className={styles.langField}>
                                    <InputLabel id='lang-label'>Linguagem</InputLabel>
                                    <Select
                                        labelId='lang-label'
                                        id='lang'
                                        name='lang'
                                        label='Linguagem'
                                        onChange={formProps.handleChange}
                                        value={formProps.values.lang}
                                    >
                                        <MenuItem value='por'>Português</MenuItem>
                                        <MenuItem value='eng'>Inglês</MenuItem>
                                        <MenuItem value='por+eng'>Misto</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <Button 
                                type='submit' 
                                variant='contained' 
                                endIcon={<SendIcon />} 
                                disabled={!formProps.isValid}
                            >
                                Converter
                            </Button>
                        </Form>
                    )}
                </Formik>
                <form className={styles.actions} onSubmit={e => addImage(e)}>

                </form>
            </Card>

            <div>
                {
                    images.map(img => <ImgCheck {...img} />)
                }
            </div>
        </div>
    )
}

export default Home