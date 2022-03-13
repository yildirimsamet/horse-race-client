import UserProviderWrapper from '../components/providers/UserProviderWrapper';
import WrapperLayout from '../components/Layout'
import 'sweetalert2/src/sweetalert2.scss'
import 'react-toastify/dist/ReactToastify.css';
import "antd/dist/antd.css";
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
