import { Input, Button } from 'antd';
import { useState } from 'react';
import styles from './styles.module.scss';
import axios from '../../../utils/axios';
import END_POINTS from '../../../config/END_POINTS.json';
import { useUser } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { setUserStorageAndCookie } from '../../../utils/user';

const Register = () => {
    const { setUser } = useUser();
    const userInfoInitial = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',

    };
    const [userInfo, setUserInfo] = useState(userInfoInitial)
    const [loading, setLoading] = useState(false)

    const clearInputs = () => {
        setUserInfo(userInfoInitial);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post(END_POINTS.user.register, userInfo);
            console.log('data', data)
            if (data.success) {
                clearInputs();
                setUserStorageAndCookie({ user: data.user, token: data.token });
                toast.success('Register successful!');
                setLoading(false)
                setUser(data.user);
            } else {
                toast.error('Check your credentials!');
            }
        } catch (error) {
            toast.error('An error occured!');
            setLoading(false)
        }
    }
    
    const handleInputs = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <form className={styles.registerForm} onSubmit={handleLogin}>
                <Input name='name' value={userInfo.name} onChange={handleInputs} className={styles.registerInput} placeholder='Name' />
                <Input name='surname' value={userInfo.surname} onChange={handleInputs} className={styles.registerInput} placeholder='Surname' />
                <Input name='email' value={userInfo.email} onChange={handleInputs} className={styles.registerInput} placeholder='Email' />
                <Input name='password' value={userInfo.password} onChange={handleInputs} className={styles.registerInput} placeholder='Password' type='password' />
                <Input name='confirmPassword' value={userInfo.confirmPassword} onChange={handleInputs} className={styles.registerInput} placeholder='Confirm Password' type='password' />
                <Button htmlType='submit' loading={loading} className={styles.registerButton} type='primary'>Login</Button>
            </form>
        </div>
    )
}
export default Register;