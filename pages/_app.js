import NextNProgress from "nextjs-progressbar";
import UserProviderWrapper from "../components/providers/UserProviderWrapper";
import WrapperLayout from "../components/Layout";
import "sweetalert2/src/sweetalert2.scss";
import "react-toastify/dist/ReactToastify.css";
import "antd/dist/antd.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <UserProviderWrapper>
      <WrapperLayout>
        <NextNProgress
          color="#faf4d3"
          startPosition={0.3}
          stopDelayMs={100}
          height={2}
          showOnShallow={true}
        />
        <Component {...pageProps} />
      </WrapperLayout>
    </UserProviderWrapper>
  );
}

export default MyApp;
