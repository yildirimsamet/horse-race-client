import { useUser } from "../contexts/UserContext";
import { LeftOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './styles.module.scss';
const Hamburger = ({ isMenuOpen, setIsMenuOpen }) => {
    const { user } = useUser();
    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    return <>
        {isMenuOpen ?
            <LeftOutlined className={styles.menuIcon} onClick={handleMenuOpen} /> :
            user ? <UserOutlined className={styles.menuIcon} onClick={handleMenuOpen} /> :
                <LockOutlined className={styles.menuIcon} onClick={handleMenuOpen} />}
    </>
}
export default Hamburger;