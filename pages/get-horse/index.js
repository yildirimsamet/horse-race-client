import HeaderTitle from "../../components/HeaderTitle";
import HorseChest from "../../components/HorseChest";
import styles from "./styles.module.scss";
import axios from "../../utils/axios";
import END_POINTS from "../../config/END_POINTS.json";
import { useUser } from "../../components/contexts/UserContext";
import { toast } from "react-toastify";
import { useState } from "react";
import { Modal } from "antd";
import getConfigForClient from "../../utils/getConfigForClient";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import HorseCard from '../../components/HorseCard'
const MySwal = withReactContent(Swal)

const GetHorsePage = ({ horseChests }) => {
  const { user } = useUser();
  const [buyedHorse, setBuyedHorse] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChest, setSelectedChest] = useState({
    level: "",
    price: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    
   try {
    const { data } = await axios.post(
      END_POINTS.horse.buy_horse_chest,
      { chestLevel: selectedChest.level },
      getConfigForClient()
    );
      console.log('data',data)
    if (data.success) {
      MySwal.fire({
        icon: 'success',
        title: 'Congrats! You unlocked a new horse!',
        html: <HorseCard horse={data.horse}/>,
      })
    } else {
      toast.error(data.message || "Something went wrong");
    }
    setIsModalVisible(false);
   } catch (error) {
     toast.error('Something went wrong');
     setIsModalVisible(false);
   }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBuyPopup = ({ level, price }) => {
    if (user.coins < price) return toast.error("You don't have enough coins!");
    setSelectedChest({ level, price });
    showModal();
  };
  return (
    <div className={styles.getHorse}>
      <HeaderTitle>Get a Horse!</HeaderTitle>
      <div className={styles.getHorseBoxes}>
        {horseChests &&
          horseChests.map((chestData) => {
            return (
              <HorseChest
                key={chestData.id}
                level={chestData.level}
                onClick={() => {
                  handleBuyPopup({
                    level: chestData.level,
                    price: chestData.price,
                  });
                }}
              />
            );
          })}
      </div>
      <Modal
        title="Buy Horse"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Buy"
        confirmLoading={isLoading}
      >
        <p>
          You are about to but <strong>Level {selectedChest.level} </strong>{" "}
          chest for <strong>{selectedChest.price} coins</strong>!
        </p>
      </Modal>
    </div>
  );
};
export const getServerSideProps = async () => {
  const { data } = await axios.get(END_POINTS.horse.get_horse_chests);
  const horseChests = data.success ? data.horseChests : null;
  return {
    props: {
      horseChests,
    },
  };
};
export default GetHorsePage;