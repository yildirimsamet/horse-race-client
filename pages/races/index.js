import getConfigForServer from "../../utils/getConfigForServer";
import axios from "../../utils/axios";
import END_POINTS from "../../config/END_POINTS.json";
import RacesProviderWrapper from "../../components/providers/RacesProviderWrapper";
import RacesBody from "../../components/bodies/RacesBody";

const RacesPage = ({ sRaces }) => {
  return (
    <RacesProviderWrapper>
      <RacesBody sRaces={sRaces} />
    </RacesProviderWrapper>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  try {
    const config = await getConfigForServer(req, res);
    if (!config.headers.Authorization) {
      throw new Error("No authorization header");
    }
    const { data } = await axios.get(END_POINTS.races.get_races, config);

    return {
      props: {
        sRaces: data.races || [],
      },
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
export default RacesPage;
