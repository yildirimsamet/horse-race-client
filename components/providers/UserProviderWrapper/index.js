import { useState } from "react";
import { UserProvider } from "../../contexts/UserContext";

const UserProviderWrapper = ({children})=>{
    const [user, setUser] = useState({name:"samet"});
    return (
        <UserProvider value={{user}}>
            {children}
        </UserProvider>
    )
}
export default UserProviderWrapper;