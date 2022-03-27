import { Modal, Button, Select } from "antd";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";
import END_POINTS from "../../../config/END_POINTS.json";
import axios from "../../../utils/axios";
import getConfigForClient from "../../../utils/getConfigForClient";
import { useState } from "react";
import HorseCardMini from "../../HorseCardMini";
import { useRaces } from "../../contexts/RacesContext";
import { useRouter } from "next/router";
const { Option } = Select;

const RaceCardFooter = ({ race }) => {
  const router = useRouter();
  const { cRaces, setCRaces } = useRaces();
  const isDone = race.statu === 1;
  const { currentCount, maxCount, price, statu } = race;
  const isFull = currentCount / maxCount == 1;
  const { user, setUser } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userAvailableHorses, setUserAvailableHorses] = useState(null);
  const [selectedHorseId, setSelectedHorseId] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const { data } = await axios.post(
      END_POINTS.races.join_race,
      { raceId: race.id, horseId: selectedHorseId },
      getConfigForClient()
    );
    if (!data.success)
      return toast.error(data.message || "Something went wrong!");
    setUser({ ...user, coins: user.coins - race.price });

    const manipulatedUser = { ...user };
    manipulatedUser.horseInfo = userAvailableHorses.find(
      (horse) => horse.id === selectedHorseId
    );
    setCRaces(
      cRaces.map((cRace) => {
        if (cRace.id === race.id) {
          return {
            ...cRace,
            currentCount: cRace.currentCount + 1,
            users: [...cRace.users, manipulatedUser],
          };
        }
        return cRace;
      })
    );
    toast.success("You joined race successfully!");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleRaceJoin = async () => {
    if (user.coins < price) return toast.error("You dont have enough coins!");
    if (isFull) return toast.error("This race is full!");
    const { data } = await axios.get(
      END_POINTS.user.get_horses_for_race,
      getConfigForClient()
    );
    if (data.success) {
      showModal();
      setUserAvailableHorses(data.horses);
    }
  };
  function handleChange(value) {
    setSelectedHorseId(value);
  }
  const handleWatch = () => {
    router.push("/races/" + race.id);
  };
  return (
    <div className={styles.raceCardFooter}>
      {isDone ? (
        <Button onClick={handleWatch} disabled={!isDone}>
          Watch
        </Button>
      ) : (
        <Button onClick={handleRaceJoin} disabled={isFull || isDone}>
          {isFull ? "Full!" : "Join"}
        </Button>
      )}

      {/* GET AND SHOW AVAILABLE HORSES */}
      <Modal
        centered
        title="Select An Horse"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={400}
      >
        {userAvailableHorses ? (
          <div>
            <Select style={{ width: "100%" }} onChange={handleChange}>
              {userAvailableHorses.map((horse) => {
                return (
                  <Option key={horse.id} value={horse.id}>
                    <div className={styles.raceCardFooterSelectOption}>
                      {horse.name}
                      <HorseCardMini color={horse.color} />
                    </div>
                  </Option>
                );
              })}
            </Select>
          </div>
        ) : (
          <div>You dont have any available horse!</div>
        )}
      </Modal>
    </div>
  );
};

export default RaceCardFooter;
