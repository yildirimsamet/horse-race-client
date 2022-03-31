import { Input, Button } from 'antd';
import { useState } from 'react';
import styles from './styles.module.scss';
import axios from '../../../utils/axios';
import END_POINTS from '../../../config/END_POINTS.json';
import { useUser } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { setUserStorageAndCookie } from '../../../utils/user';

const Login = () => {
    const { setUser } = useUser();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post(END_POINTS.user.login, userInfo);
            if (data.success) {
                setUser(data.user);
                setUserStorageAndCookie({ user: data.user, token: data.token });
                toast.success('Login successful!');
            } else {
                toast.error(data.message || 'Check your credentials!');
            }
        } catch (error) {
            console.log(error)
            toast.error('An error occured!');
        } finally {
            setLoading(false)
        }
    }
    const handleInputs = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <Input type="email" name='email' value={userInfo.email} onChange={handleInputs} className={styles.loginInput} placeholder='Email' />
                <Input minLength={6} name='password' value={userInfo.password} onChange={handleInputs} className={styles.loginInput} placeholder='Password' type='password' />
                <Button htmlType='submit' loading={loading} className={styles.loginButton} type='primary'>Login</Button>
            </form>
        </div>
    )
}
export default Login;