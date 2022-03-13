import getConfigForServer from "../../utils/getConfigForServer";

const HorseShopPage = () => {
  return <div>Horse shop</div>;
};
export const getServerSideProps = async ({ req, res }) => {
  try {
    const config = await getConfigForServer(req, res);
    if (!config.headers.Authorization) {
      throw new Error("No authorization header");
    }
    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
};
export default HorseShopPage;
