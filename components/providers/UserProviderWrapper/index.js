import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../utils/storage";
import { UserProvider } from "../../contexts/UserContext";
import Cookies from "js-cookie";
import { removeUserStorageAndCookie } from "../../../utils/user";
const UserProviderWrapper = ({ children }) => {
    const [user, setUser] = useState(null);
    const [firstTimeSession, setFirstTimeSession] = useState(true);

    useEffect(() => {
        setFirstTimeSession(false);
        if (firstTimeSession) {
            if (!getLocalStorage('user') || !Cookies.get('token')) {
                setUser(null);
                removeUserStorageAndCookie()
            } else{
                setUser(getLocalStorage('user'));
            }
        }
    }, [])

    return (
        <UserProvider value={{ user, setUser }}>
            {children}
        </UserProvider>
    )
}
export default UserProviderWrapper;