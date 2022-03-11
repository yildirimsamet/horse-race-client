import Cookies from 'js-cookie';
import { removeLocalStorage, setLocalStorage } from "./storage"

export const setUserStorageAndCookie = ({ user, token }) => {
    setLocalStorage({
        name: "user",
        value: user
    })

    Cookies.set('token', token, { expires: 7 });
}

export const removeUserStorageAndCookie = () => {
    Cookies.remove('token');
    removeLocalStorage("user");
}

