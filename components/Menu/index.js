import Navigations from "../Navigations";
import UserMenu from "../UserMenu";
import styles from "./styles.module.scss";
const Menu = ({setIsMenuOpen}) => {
  return (
    <div className={styles.menu}>
      <div className={styles.menuItem}>
        <UserMenu />
      </div>
      <div className={styles.menuItem}>
        <Navigations setIsMenuOpen={setIsMenuOpen} />
      </div>
    </div>
  );
};
export default Menu;
