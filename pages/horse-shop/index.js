import getConfigForServer from "../../utils/getConfigForServer";
import getConfigForClient from "../../utils/getConfigForClient";
import axios from "../../utils/axios";
import END_POINTS from "../../config/END_POINTS.json";
import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import HorseCardHero from "../../components/HorseCard/HorseCardHero";
import { GiTwoCoins } from "react-icons/gi";
import { useUser } from "../../components/contexts/UserContext";
import SwalReact from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import HeaderTitle from "../../components/HeaderTitle";

const Swal = withReactContent(SwalReact);
const HorseShopPage = ({ sHorses }) => {
  const { user, setUser } = useUser();
  const [cHorses, setCHorses] = useState(sHorses);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    setTableData(
      cHorses.map((horse, index) => {
        return { ...horse, key: index };
      })
    );
  }, [cHorses]);
  const columns = [
    {
      title: "ID",
      key: "horseId",
      dataIndex: "horseId",
    },
    {
      title: "Owner",
      key: "owner",
      render: (marketItem) =>
        marketItem.owner.name + " " + marketItem.owner.surname,
    },
    {
      title: "Image",
      key: "image",
      render: (marketItem) => (
        <HorseCardHero
          style={{ fontSize: 50 }}
          color={marketItem.horse.color}
          level={marketItem.horse.level}
        />
      ),
    },
    {
      title: "Age",
      key: "age",
      render: (marketItem) => marketItem.horse.age,
    },
    {
      title: "Satiety",
      key: "satiety",
      render: (marketItem) => marketItem.horse.satiety,
    },
    {
      title: "Fat Ratio",
      key: "fatRatio",
      render: (marketItem) => marketItem.horse.fatRatio,
    },
    {
      title: "Level",
      key: "level",
      render: (marketItem) => marketItem.horse.level,
    },
    {
      title: "Experience",
      key: "experience",
      render: (marketItem) => marketItem.horse.experience,
    },
    {
      title: "Weight",
      key: "weight",
      render: (marketItem) => marketItem.horse.weight,
    },
    {
      title: "Price",
      key: "price",
      render: (marketItem) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <GiTwoCoins size={20} color="#D1AC00" /> {marketItem.price}
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (marketItem) => {
        return (
          <div>
            {user?.id === marketItem.owner.id ? (
              <Button
                onClick={() => {
                  Swal.fire({
                    title: "You are about to cancel, are you sure?",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    showLoaderOnConfirm: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      axios
                        .post(
                          END_POINTS.horse_market.cancel_sell,
                          {
                            marketId: marketItem.id,
                          },
                          getConfigForClient()
                        )
                        .then((res) => {
                          if (res.data.success) {
                            setCHorses(
                              cHorses.filter(
                                (horse) => horse.horseId !== marketItem.horseId
                              )
                            );
                            toast.success(
                              res.data.message || "Successfully canceled"
                            );
                          } else {
                            toast.error(
                              res.data.message || "Something went wrong"
                            );
                          }
                        })
                        .catch((err) => {
                          toast.error(err.message);
                        });
                    }
                  });
                }}
                type="alert"
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={() => {
                  Swal.fire({
                    title: "You are about to buy, are you sure?",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    showLoaderOnConfirm: true,
                  }).then((result) => {
                    if (user.coins < marketItem.price) {
                      return toast.error("You don't have enough coins");
                    }
                    if (result.isConfirmed) {
                      axios
                        .post(
                          END_POINTS.horse_market.buy_horse,
                          {
                            marketId: marketItem.id,
                          },
                          getConfigForClient()
                        )
                        .then((res) => {
                          if (res.data.success) {
                            setUser({
                              ...user,
                              coins: user.coins - marketItem.price,
                            });
                            setCHorses(
                              cHorses.filter(
                                (horse) => horse.horseId !== marketItem.horseId
                              )
                            );
                            toast.success(
                              res.data.message || "Successfully buyed!"
                            );
                          } else {
                            toast.error(
                              res.data.message || "Something went wrong"
                            );
                          }
                        })
                        .catch((err) => {
                          toast.error(err.message);
                        });
                    }
                  });
                }}
                disabled={user?.coins < marketItem.price}
                type="primary"
              >
                Buy
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <HeaderTitle>🏪 Horse Market 🏪</HeaderTitle>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  try {
    const config = await getConfigForServer(req, res);
    if (!config.headers.Authorization) {
      throw new Error("No authorization header");
    }
    const { data } = await axios.get(
      END_POINTS.horse_market.get_horses,
      config
    );

    if (!data.success) {
      return {
        props: {
          sHorses: [],
        },
      };
    }
    return {
      props: {
        sHorses: data.horsesOnMarket,
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
export default HorseShopPage;
