import { useState } from "react";
import { UserProvider } from "../../contexts/UserContext";

const UserProviderWrapper = ({children})=>{
    const [user, setUser] = useState(null);
    return (
        <UserProvider value={{user, setUser}}>
            {children}
        </UserProvider>
    )
}
export default UserProviderWrapper;