import { useUser } from "../../../contexts/UserContext";
import HorseCardMini from "../../../HorseCardMini";
import styles from "./styles.module.scss";
import SwalReact from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "../../../../utils/axios";
import END_POINTS from "../../../../config/END_POINTS.json";
import { toast } from "react-toastify";
import { useRaces } from "../../../contexts/RacesContext";
import getConfigForClient from "../../../../utils/getConfigForClient";

const Swal = withReactContent(SwalReact);
const RaceListItem = ({ user: raceUser, race }) => {
  const { user: currentUser, setUser } = useUser();
  const { cRaces, setCRaces } = useRaces();
  const handleLeaveRace = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to leave race",
      icon: "warning",
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: "Yes, leave!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.post(END_POINTS.races.leave_race, {
          raceId:race.id,
          horseId: raceUser.horseInfo.id,
        }, getConfigForClient());
        if (!data.success)
          return toast.error(data.message || "Something went wrong");
        setUser({ ...currentUser, coins: currentUser.coins + race.price });
        setCRaces(
          cRaces.map((cRace) => {
            if (cRace.id === race.id) {
              return {
                ...cRace,
                currentCount: cRace.currentCount - 1,
                users: cRace.users.filter((user) => user.id !== currentUser.id),
              };
            }
            return cRace;
          })
        );
        return toast.success(data.message || "You left the race!");
      }
    });
  };
  return (
    <div className={styles.wrapper}>
      {raceUser.id === currentUser?.id && race.statu != 1 && (
        <div onClick={handleLeaveRace} className={styles.wrapperClose}>
          X
        </div>
      )}
      <div className={styles.wrapperId}>{raceUser.id}.</div>
      <div className={styles.wrapperNameUser}>{raceUser.name}</div>
      <div className={styles.wrapperNameHorse}>{raceUser.horseInfo.name}</div>
      <HorseCardMini
        color={raceUser.horseInfo.color}
        className={styles.wrapperHorse}
      />
    </div>
  );
};

export default RaceListItem;
