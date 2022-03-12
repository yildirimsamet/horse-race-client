import axios from "../../utils/axios";
import END_POINTS from "../../config/END_POINTS.json";
import getConfigForServer from "../../utils/getConfigForServer";
import styles from "./styles.module.scss";
import { useState } from "react";
import HorseCard from "../../components/HorseCard";
import HeaderTitle from "../../components/HeaderTitle";

const MyBarnPage = ({ sHorses }) => {
  const [cHorses ] = useState(sHorses);
  
  return (
    <div className={styles.barn}>
      <HeaderTitle>
      My Barn 🏚️
      </HeaderTitle>
      <div className={styles.barnHorseCards}>
       {cHorses.map((horse)=>{
         console.log("horse",horse)
         return <HorseCard key={horse.id} horse={horse} />
       })}
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  const config = await getConfigForServer(req, res);
  const { data } = await axios.get(END_POINTS.user.get_horses, config);

  return {
    props: {
      sHorses: data.horses,
    },
  };
};
export default MyBarnPage;
