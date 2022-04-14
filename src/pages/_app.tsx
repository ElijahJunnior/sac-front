import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Navigation } from '../components/Navigation';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';

import '../styles/global.scss';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    // provider de autenticação
    <AuthProvider>
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
    </AuthProvider>
  )

}

export default MyApp