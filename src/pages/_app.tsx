import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Navigation } from '../components/Navigation';
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (

    <div className="mainContainer">
      <Header />
      <div className='mainBody'>
        <Navigation />
        <div className='mainContent'>
          <Component {...pageProps} />
        </div>
      </div>
    </div >
  )

}

export default MyApp
