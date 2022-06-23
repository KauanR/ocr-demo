import { FC, useMemo, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from './ImgCheck.module.scss'
import axios from 'axios'

export interface ImgCheckProps {
    number: number
    url: string
    language: string
}

const ImgCheck: FC<ImgCheckProps> = ({ number, url, language }) => {

    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    async function load(): Promise<void> {
        setLoading(true)

        axios.post('http://localhost:3333/', { url, lang: language })
            .then(res => {
                const { data: { text } } = res
                setResult(text)
            })
            .catch(err => {
                setError(err.message || err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useMemo(() => {
        load()
    }, [])

    return (
        <Accordion>
            <AccordionSummary  expandIcon={<ExpandMoreIcon />}>
                <Typography>
                    Imagem {number}
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                <div className={styles.imgGrid}>
                    <img src={url} />
                    {
                        loading && !result && !error && 
                        <div className={styles.loading}>
                            <CircularProgress variant='indeterminate' size='4rem' />
                        </div>
                    }
                    {
                        !loading && error &&
                        <div className={styles.error}>
                            <Typography variant='body1'>
                                Um erro ocorreu um erro ao tentar converter a imagem, confira o console para mais detalhes:
                            </Typography>
                            <Typography variant='body1'>
                                { error }
                            </Typography>
                        </div>
                    }
                    {
                        !loading && result &&
                        <pre className={styles.text}>
                            { result }
                        </pre>
                    }

                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default ImgCheck