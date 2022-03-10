import { Tabs } from 'antd';
import Login from './Login';
import styles from './styles.module.scss';
const { TabPane } = Tabs;

const LoginMenu = () => {
    const tabNames = {
        login: {
            key: 'login',
            name: 'Login',
        },
        register: {
            key: 'register',
            name: 'Register',
        }
    }
    const handleTabChange = (key) => {
        console.log(key)
    }
    return (
        <div className={styles.tabWrapper}>
            <Tabs centered  defaultActiveKey={tabNames.login.key} onChange={handleTabChange}>
            <TabPane  tab={tabNames.login.name} key={tabNames.login.key}>
               <Login />
            </TabPane>
            <TabPane tab={tabNames.register.name} key={tabNames.register.key}>
                Content of Tab Pane 2
            </TabPane>
        </Tabs>
        </div>
    )
}
export default LoginMenu;