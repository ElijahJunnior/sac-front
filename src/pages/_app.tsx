import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Navigation } from '../components/Navigation';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme} >
        {/* <div className="mainContainer"> */}
          {/* <Header /> */}
          {/* <main className='mainBody'> */}
            {/* <Navigation /> */}
            {/* <div className='mainContent'> */}
              <Component {...pageProps} />
            {/* </div> */}
          {/* </main> */}
        {/* </div > */}
    </ChakraProvider>
  )

}

export default MyApp