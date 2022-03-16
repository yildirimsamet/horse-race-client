import { Button, Modal } from "antd";
import { useState } from "react";
import styles from "./styles.module.scss";
import axios from "../../../utils/axios";
import END_POINTS from "../../../config/END_POINTS.json";
import { useUser } from "../../contexts/UserContext";
import { Select, InputNumber } from "antd";
import {toast} from 'react-toastify';
import getConfigForClient from '../../../utils/getConfigForClient';

const { Option } = Select;

const HorseCardFooter = ({ horse, cHorses, setCHorses }) => {
  const { user, setUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedFoodInput, setSelectedFoodInput] = useState(1);

  const handleFoodChange = (id) => {
    setSelectedFoodInput(1);
    setSelectedFood(user?.items?.find((item) => item.id === id));
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsLoading(true);
    try {
      if (
        selectedFoodInput > 0 ||
        selectedFoodInput <=
          (user?.items?.find((item) => item.id == selectedFood.id)).quantity
      ) {
        const { data } = await axios.post(END_POINTS.horse.feed_horse, {
          horseId: horse.id,
          foodId: selectedFood.id,
          foodQuantity: selectedFoodInput,
        },getConfigForClient());
        if (data?.success) {
          setUser({
            ...user,
            items: user.items.map((item) => {
              if (item.id == selectedFood.id) {
                item.quantity -= selectedFoodInput;
              }
              return item;
            }),
          });
  
          setCHorses(
            cHorses.map((cHorse) => {
              if (cHorse.id === horse.id) {
                return {
                  ...cHorse,
                  satiety:
                    cHorse.satiety + selectedFoodInput * selectedFood.energy > 100
                      ? 100
                      : cHorse.satiety + selectedFoodInput * selectedFood.energy,
                };
              }
              return cHorse;
            })
          );
          toast.success("Horse satiety increased!");
          setIsModalVisible(false)
        } else {
          toast.error(data?.message || "Something went wrong!");
        }
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const feedHorse = () => {
    showModal();
  };
  const handleQuantity = (value) => {
    setSelectedFoodInput(value);
  };
  return (
    <>
      <div className={styles.horseFooter}>
        <Button>Race</Button>
        <Button>Sell</Button>
        <Button
          onClick={() => {
            setModalInfo({ title: "Feed Horse" });
            feedHorse();
          }}
        >
          Feed
        </Button>
      </div>
      <Modal
        centered
        title={modalInfo.title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Ok"
        confirmLoading={isLoading}
        width={250}
        okButtonProps={{
          disabled: selectedFood?.quantity <= 0 || !selectedFood,
        }}
      >
        <div>
          <Select
            placeholder="Select food."
            style={{ width: "100%" }}
            onChange={handleFoodChange}
          >
            {user?.items?.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
          {selectedFood && (
            <InputNumber
              style={{ width: "100%", marginTop: 15 }}
              defaultValue={1}
              min={1}
              value={selectedFoodInput}
              max={selectedFood?.quantity}
              onChange={handleQuantity}
            />
          )}
        </div>
      </Modal>
    </>
  );
};
export default HorseCardFooter;
