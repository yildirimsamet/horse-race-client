import Navigations from "../Navigations";
import UserMenu from "../UserMenu";
import styles from "./styles.module.scss";
const Menu = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.menuItem}>
        <UserMenu />
      </div>
      <div className={styles.menuItem}>
        <Navigations />
      </div>
    </div>
  );
};
export default Menu;
