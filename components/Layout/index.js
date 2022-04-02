import { Layout } from "antd";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import Hamburger from "../Hamburger";
import LoginMenu from "../LoginMenu";
import { useUser } from "../contexts/UserContext";
import { ToastContainer } from "react-toastify";
import useWindowType from "../../hooks/useWindowType";
import Menu from "../Menu";

const { Header, Footer, Sider, Content } = Layout;

const Wrapper = ({ children }) => {
  const windowType = useWindowType();
  const [isMenuOpen, setIsMenuOpen] = useState(windowType !== "desktop" ? false : true);
  const { user } = useUser();
  const [currentWindowType, setCurrentWindowType] = useState(windowType);

  useEffect(() => {
    if (currentWindowType !== windowType) {
      setIsMenuOpen(false);
      setCurrentWindowType(windowType);
    }
  }, [windowType]);

  return (
    <Layout>
      <Sider
        className={cn(
          styles.sideBar,
          isMenuOpen ? styles.sideBarIsOpened : styles.sideBarIsClosed,
          windowType !== "desktop" && styles.sideBarMobile
        )}
      >
        <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        {user ? <Menu setIsMenuOpen={setIsMenuOpen} /> : <LoginMenu />}
      </Sider>
      <Layout>
        <Header className={styles.header}>Pixel Race 🏇</Header>
        <Content style={{ minHeight: "100vh" }} className={styles.content}>
          {children}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};
export default Wrapper;
