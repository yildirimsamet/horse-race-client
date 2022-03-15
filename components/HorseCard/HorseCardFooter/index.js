import { Button, Modal } from "antd";
import { useState } from "react";
import styles from "./styles.module.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useUser } from "../../contexts/UserContext";
import { Select, InputNumber } from "antd";

const { Option } = Select;

const HorseCardFooter = ({ horse, cHorses, setCHorses }) => {
  const { user, setUser } = useUser();
  console.log(user);
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
    if (
      selectedFoodInput > 0 ||
      selectedFoodInput <=
        (user?.items?.find((item) => item.id == selectedFood.id)).quantity
    ) {
      // Some code..
      // Assume for now request is okey.

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
        okButtonProps={{ disabled: selectedFood?.quantity <= 0  || !selectedFood}}
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
