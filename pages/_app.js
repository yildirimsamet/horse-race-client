import UserProviderWrapper from '../components/providers/UserProviderWrapper';
import WrapperLayout from '../components/Layout'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <UserProviderWrapper>
      <WrapperLayout>
      <Component {...pageProps} />
    </WrapperLayout>
    </UserProviderWrapper>
  )
}

export default MyApp;
