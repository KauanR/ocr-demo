import { createTheme, ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/main.scss'

export default function App({ Component, pageProps }: AppProps) {

    const theme = createTheme({
        palette: {
            mode: 'dark'
        }
    })

    return (
        <>
            <Head>
                <title>OCR Demo</title>
            </Head>
            <main>
                <ThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </ThemeProvider>
            </main>
        </>
    )
}