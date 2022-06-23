import { FC, useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js'
import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from './ImgCheck.module.scss'

export interface ImgCheckProps {
    key: string
    number: number
    url: string
    language: string
}

const ImgCheck: FC<ImgCheckProps> = ({ number, url, language }) => {

    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(0)
    const [error, setError] = useState('')

    async function load(): Promise<void> {
        const worker = createWorker({
            logger: log => {
                if(log.status === 'recognizing text')
                    setLoading(Math.trunc(log.progress * 100))
            }
        })

        try {
            await worker.load()
            await worker.loadLanguage(language)
            await worker.initialize(language)
    
            const { data: { text } } = await worker.recognize(url)

            setResult(text)
    
            await worker.terminate()
        } catch(err: any) {
            console.log(err)
            setError(err.message || err)
        }
    }

    useEffect(() => {
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
                        !result && !error && 
                        <div className={styles.loading}>
                            <CircularProgress variant='determinate' value={loading} />
                            <div className={styles.text}>
                                <Typography variant='caption' color='text.secondary'>
                                    {loading}%
                                </Typography>
                            </div>
                        </div>
                    }
                    {
                        error &&
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
                        result &&
                        <pre>
                            { result }
                        </pre>
                    }

                </div>
            </AccordionDetails>
        </Accordion>
    )
}

export default ImgCheck