import { Button, Modal } from "antd";
import { useState } from "react";
import styles from "./styles.module.scss";
import axios from "../../../utils/axios";
import END_POINTS from "../../../config/END_POINTS.json";
import { useUser } from "../../contexts/UserContext";
import { Select, InputNumber } from "antd";
import { toast } from "react-toastify";
import getConfigForClient from "../../../utils/getConfigForClient";
import SwalReact from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
const Swal = withReactContent(SwalReact);
const { Option } = Select;

const HorseCardFooter = ({ horse, cHorses, setCHorses }) => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [sellPrice, setSellPrice] = useState(1);
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
        const { data } = await axios.post(
          END_POINTS.horse.feed_horse,
          {
            horseId: horse.id,
            foodId: selectedFood.id,
            foodQuantity: selectedFoodInput,
          },
          getConfigForClient()
        );
        if (data?.success) {
          setUser({
            ...user,
            items: user?.items.map((item) => {
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
                    cHorse.satiety + selectedFoodInput * selectedFood.energy >
                    100
                      ? 100
                      : cHorse.satiety +
                        selectedFoodInput * selectedFood.energy,
                  weight:
                    cHorse.weight + selectedFoodInput * selectedFood.energy >
                    1000
                      ? 1000
                      : cHorse.weight + selectedFoodInput * selectedFood.energy,
                };
              }
              return cHorse;
            })
          );
          toast.success("Horse satiety increased!");
          setIsModalVisible(false);
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
  const handleSell = () => {
    Swal.fire({
      title: "You are about to sell your horse",
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      input: "number",
      inputValue: 1,
      inputAttributes: {
        min: 1,
      },
    }).then((result) => {
      if (result.value <= 0) {
        return toast.error("Price must be greater than 0!");
      }
      try {
        if (result.isConfirmed) {
          axios
            .post(
              END_POINTS.horse.sell_horse,
              { horseId: horse.id, price: +result.value },
              getConfigForClient()
            )
            .then((res) => {
              if (res.data.success) {
                toast.success("Horse on market now!");
                setCHorses(
                  cHorses.map((cHorse) => {
                    if (cHorse.id === horse.id) {
                      return { ...cHorse, isOnMarket: true, };
                    }
                    return cHorse;
                  })
                );
              } else {
                toast.error(res.data.message || "Something went wrong!");
              }
            })
            .catch((err) => {
              toast.error(err.message || "Something went wrong!");
            });
        }
        setSellPrice(1);
      } catch (error) {
        toast.error(error?.message || "Something went wrong!");
      }
    });
  };
  return (
    <>
      <div className={styles.horseFooter}>
        <Button
        onClick={()=>{
          router.push("/races")
        }}
        >Race</Button>
        <Button onClick={handleSell}>Sell</Button>
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
