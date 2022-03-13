import Cookies from "js-cookie";
const getConfigForClient = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = Cookies.get("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
};
export default getConfigForClient;
