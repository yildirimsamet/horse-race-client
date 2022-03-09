import { Layout } from 'antd';
import { LeftOutlined, RightOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames'
import { useUser } from '../contexts/UserContext';

const { Header, Footer, Sider, Content } = Layout;

const Wrapper = ({ children }) => {
    const { user } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    return (
        <Layout>
            <Sider className={cn(styles.sideBar, isMenuOpen ? styles.sideBarIsOpened : styles.sideBarIsClosed)}>
                {isMenuOpen ?
                    <LeftOutlined className={styles.menuIcon} onClick={handleMenuOpen} /> :
                    user ? <UserOutlined className={styles.menuIcon} onClick={handleMenuOpen} /> :
                        <LockOutlined className={styles.menuIcon} onClick={handleMenuOpen} />}
            </Sider>
            <Layout>
                <Header className={styles.header}>Pixel Race 🏇</Header>
                <Content className={styles.content}>{children}</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    )
}
export default Wrapper;