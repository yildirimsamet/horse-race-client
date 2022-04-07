import axios from "../../utils/axios";
import END_POINTS from "../../config/END_POINTS.json";
import getConfigForServer from "../../utils/getConfigForServer";
import styles from "./styles.module.scss";
import { useState } from "react";
import HorseCard from "../../components/HorseCard";
import HeaderTitle from "../../components/HeaderTitle";
import Link from "next/link";

const MyBarnPage = ({ sHorses }) => {
  const [cHorses, setCHorses] = useState(sHorses);
  const isUserHaveHorse = cHorses.length > 0;
  return (
    <div className={styles.barn}>
      <HeaderTitle>🏚️ My Barn 🏚️</HeaderTitle>
      {isUserHaveHorse ? (
        <div className={styles.barnHorseCards}>
          {cHorses.map((horse) => {
            return (
              <HorseCard
                isPreview={false}
                cHorses={cHorses}
                setCHorses={setCHorses}
                key={horse.id}
                horse={horse}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.barnEmpty}>
          You dont have any horse yet. Try to open a
          <Link href={"/get-horse"}>
            <a> horse box </a>
          </Link>
          !
        </div>
      )}
    </div>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  try {
    const config = await getConfigForServer(req, res);
    if (!config.headers.Authorization) {
      throw new Error("No authorization header");
    }
    const { data } = await axios.get(END_POINTS.user.get_horses, config);

    return {
      props: {
        sHorses: data.horses || [],
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
export default MyBarnPage;
