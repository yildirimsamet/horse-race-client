import styles from "./styles.module.scss";
import { InputNumber, Button, Modal } from "antd";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import axios from "../../utils/axios";
import END_POINTS from "../../config/END_POINTS.json";
import getConfigForClient from "../../utils/getConfigForClient";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const PixelShopItem = ({ item }) => {
  const { user, setUser } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const maxBuyAbleQuantity = Math.floor(user?.coins / item?.price) || 0;

  const handleQuantity = (value) => {
    setQuantity(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        END_POINTS.pixel_shop.buy_item,
        {
          itemId: item.id,
          quantity,
        },
        getConfigForClient()
      );
      if (data.success) {
        const userData = { ...user };
        const purchasePrice = item.price * quantity;

        userData.coins -= purchasePrice;

        const isUserHaveItem = userData.items.some((userItem) => {
          return userItem.id === item.id;
        });

        if (!isUserHaveItem) {
          userData.items.push({...item,quantity});
        } else {
          userData.items.find((userItem) => {
            if (userItem.id === item.id) {
              userItem.quantity += quantity;
            }
          });
        }
        setUser(userData);

        MySwal.fire({
          icon: "success",
          title: "Congrats! You made a purchase!",
        });
      } else {
        toast.error(data.message || "Something went wrong");
      }
      setIsLoading(false);
      setIsModalVisible(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleBuyPopup = () => {
    if (quantity > maxBuyAbleQuantity || quantity <= 0)
      return toast.error("Please enter a valid quantity");
    showModal();
  };
  return (
    <div className={styles.pixelItem}>
      <img
        className={styles.pixelItemImg}
        src={"/assets/" + item.image}
        alt={item.name}
      />
      <p className={styles.pixelItemProperty}>
        <strong>Name: </strong> {item.name}
      </p>
      <p className={styles.pixelItemProperty}>
        <strong>Price: </strong> {item.price}
      </p>
      <p className={styles.pixelItemProperty}>
        <strong>Energy: </strong> {item.energy}
      </p>
      <div className={styles.pixelItemBuy}>
        <InputNumber
          defaultValue={1}
          min={1}
          max={maxBuyAbleQuantity}
          onChange={handleQuantity}
        />
        <Button onClick={handleBuyPopup}>Buy</Button>
      </div>
      <Modal
        title="Buy Item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Buy"
        confirmLoading={isLoading}
      >
        <p>
          You are about to buy <strong>{quantity + " " + item.name} </strong>{" "}
          for <strong>{quantity * item.price} coins</strong>!
        </p>
      </Modal>
    </div>
  );
};
export default PixelShopItem;
