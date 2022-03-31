import { Input, Button } from "antd";
import { useState } from "react";
import styles from "./styles.module.scss";
import axios from "../../../utils/axios";
import END_POINTS from "../../../config/END_POINTS.json";
import { useUser } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { setUserStorageAndCookie } from "../../../utils/user";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const Register = () => {
  const [isInputsVisible, setIsInputsVisible] = useState(false);
  const { setUser } = useUser();
  const userInfoInitial = {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
  };
  const [userInfo, setUserInfo] = useState(userInfoInitial);
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    setUserInfo(userInfoInitial);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    try {
      setLoading(true);
      const { data } = await axios.post(END_POINTS.user.register, userInfo);
      if (data.success) {
        clearInputs();
        setUserStorageAndCookie({ user: data.user, token: data.token });
        toast.success("Register successful!");
        setLoading(false);
        setUser(data.user);
      } else {
        toast.error(error.message || "Check your credentials!");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occured!");
      setLoading(false);
    }
  };

  const handleInputs = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className={styles.registerForm} onSubmit={handleLogin}>
        <Input
          minLength={3}
          required
          name="name"
          value={userInfo.name}
          onChange={handleInputs}
          className={styles.registerInput}
          placeholder="Name"
        />
        <Input
          minLength={2}
          required
          name="surname"
          value={userInfo.surname}
          onChange={handleInputs}
          className={styles.registerInput}
          placeholder="Surname"
        />
        <Input
          required
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleInputs}
          className={styles.registerInput}
          placeholder="Email"
        />
        <Input
          required
          name="password"
          minLength={6}
          value={userInfo.password}
          onChange={handleInputs}
          className={styles.registerInput}
          placeholder="Password"
          type={isInputsVisible ? "text" : "password"}
          addonAfter={
            isInputsVisible ? (
              <EyeOutlined onClick={() => setIsInputsVisible(false)} />
            ) : (
              <EyeInvisibleOutlined onClick={() => setIsInputsVisible(true)} />
            )
          }
        />
        <Input
          required
          name="confirmPassword"
          minLength={6}
          value={userInfo.confirmPassword}
          onChange={handleInputs}
          className={styles.registerInput}
          placeholder="Confirm Password"
          type={isInputsVisible ? "text" : "password"}
          addonAfter={
            isInputsVisible ? (
              <EyeOutlined onClick={() => setIsInputsVisible(false)} />
            ) : (
              <EyeInvisibleOutlined onClick={() => setIsInputsVisible(true)} />
            )
          }
        />
        <Button
          htmlType="submit"
          loading={loading}
          className={styles.registerButton}
          type="primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
};
export default Register;
