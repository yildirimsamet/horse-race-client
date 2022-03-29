import { useEffect, useState } from "react";
import { getLocalStorage } from "../../../utils/storage";
import { UserProvider } from "../../contexts/UserContext";
import Cookies from "js-cookie";
import { removeUserStorageAndCookie } from "../../../utils/user";
import END_POINTS from "../../../config/END_POINTS.json";
import axios from "../../../utils/axios";

const UserProviderWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firstTimeSession, setFirstTimeSession] = useState(true);

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(END_POINTS.user.get_user_info, {
        headers: {
          Authorization: Cookies.get("token"),
        },
      });

      if (data.success) {
        setUser(data.user);
      } else {
        removeUserStorageAndCookie();
        setUser(null);
      }
    } catch (error) {
      removeUserStorageAndCookie();
      setUser(null);
    }
  };
  useEffect(() => {
    setFirstTimeSession(false);
    if (firstTimeSession) {
      if (!getLocalStorage("user") || !Cookies.get("token")) {
        setUser(null);
        removeUserStorageAndCookie();
      } else if (Cookies.get("token")) {
        getUserInfo();
      } else {
        setUser(getLocalStorage("user"));
      }
    }
  }, []);

  return <UserProvider value={{ user, setUser }}>{children}</UserProvider>;
};
export default UserProviderWrapper;
