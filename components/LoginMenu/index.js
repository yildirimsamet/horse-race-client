import { Tabs } from "antd";
import Login from "./Login";
import Register from "./Register";
import styles from "./styles.module.scss";
const { TabPane } = Tabs;

const LoginMenu = () => {
  const tabNames = {
    login: {
      key: "login",
      name: "Login",
    },
    register: {
      key: "register",
      name: "Register",
    },
  };

  return (
    <div className={styles.tabWrapper}>
      <Tabs centered defaultActiveKey={tabNames.login.key}>
        <TabPane tab={tabNames.login.name} key={tabNames.login.key}>
          <Login />
        </TabPane>
        <TabPane tab={tabNames.register.name} key={tabNames.register.key}>
          <Register />
        </TabPane>
      </Tabs>
    </div>
  );
};
export default LoginMenu;
