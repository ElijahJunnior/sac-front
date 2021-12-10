import { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Navigation } from '../components/Navigation';
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {

  return (

    <div className="mainContainer">
      <Header />
      <main className='mainBody'>
        <Navigation />
        <div className='mainContent'>
          <Component {...pageProps} />
        </div>
      </main>
    </div >
  )

}

export default MyApp