import getConfigForServer from "../../../utils/getConfigForServer";
import axios from "../../../utils/axios";
import END_POINTS from "../../../config/END_POINTS.json";
import WatchRaceBody from "../../../components/bodies/WatchRaceBody";
const WatchRace = ({sRaceResults}) => {
  return <WatchRaceBody sRaceResults={sRaceResults} />;
};
export const getServerSideProps = async (context) => {
  const {req,res,params} = context;
  try {
    const config = await getConfigForServer(req, res);
    if (!config.headers.Authorization) {
      throw new Error("No authorization header");
    }
    const { data } = await axios.post(
      END_POINTS.races.get_results,
      { raceId:params.id },
      config
    );
    if (data.success) {
      return {
        props: {
          sRaceResults: data.resultsInfo || [],
        },
      };
    } else {
      throw new Error("Race not found");
    }
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
export default WatchRace;
