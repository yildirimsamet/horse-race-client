import { Layout } from 'antd';
import { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames'
import Hamburger from '../Hamburger';
import UserMenu from '../UserMenu';
import LoginMenu from '../LoginMenu';
import { useUser } from '../contexts/UserContext';
import { ToastContainer } from 'react-toastify';
import Menu from '../Menu';
const { Header, Footer, Sider, Content } = Layout;
const Wrapper = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const { user } = useUser();


    return (
        <Layout>
            <Sider className={cn(styles.sideBar, isMenuOpen ? styles.sideBarIsOpened : styles.sideBarIsClosed)}>
                <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                {user ? <Menu /> : <LoginMenu />}
            </Sider>
            <Layout>
                <Header className={styles.header}>Pixel Race 🏇</Header>
                <Content style={{ minHeight: '100vh' }} className={styles.content}>{children}</Content>
                <Footer>Footer</Footer>
            </Layout>
            <ToastContainer />
        </Layout>
    )
}
export default Wrapper;