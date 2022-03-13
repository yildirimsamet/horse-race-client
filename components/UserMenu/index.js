import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useUser } from "../contexts/UserContext";
import styles from "./styles.module.scss";
import { removeUserStorageAndCookie } from "../../utils/user";
import { GiTwoCoins } from "react-icons/gi";
import { useRouter } from "next/router";
const UserMenu = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const handleLogout = () => {
    removeUserStorageAndCookie();
    setUser(null);
    router.push("/");
  };
  return (
    <div className={styles.userMenu}>
      <div className={styles.userMenuAvatar}>
        <Avatar size={64} icon={<UserOutlined />} />
      </div>
      <h3 className={styles.userMenuInfo}>
        <strong>Email: </strong>
        {user.email}
      </h3>
      <h3 className={styles.userMenuInfo}>
        <strong>Name: </strong>
        {user.name + " " + user.surname}
      </h3>
      <h3 className={styles.userMenuInfo}>
        <strong>Coins: </strong>
        <GiTwoCoins size={20} color="#D1AC00" /> {user.coins}
      </h3>
      <h3 className={styles.userMenuInfo}>
        <strong>Straw: </strong>
        <img src="/assets/straw.png" alt="" /> {user.strawCount}
      </h3>
      <h3 className={styles.userMenuInfo}>
        <strong>Carrot: </strong>
        <img src="/assets/carrot.png" alt="" /> {user.carrotCount}
      </h3>
      <div className={styles.userMenuLogout}>
        <Button onClick={handleLogout} type="primary">
          Logout
        </Button>
      </div>
    </div>
  );
};
export default UserMenu;
