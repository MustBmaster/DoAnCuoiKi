import React from "react";
import { Table, Image } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const columns = [
  {
    title: "Image",
    dataIndex: "image",
    width: 150,
    render: (src) => <Image width={100} height={100} src={src} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Artist",
    dataIndex: "artist",
    width: 150,
  },
  {
    title: "Last Listened",
    dataIndex: "last_listen",
    width: 150,
  },
];
const date = new Date();
// console.log(date);

// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Born to be a star ${i}`,
//     img: `https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/65/1b/f6/651bf621-fcf2-e3ba-4ef4-22645f26e0a0/11UMGIM12477.rgb.jpg/400x400cc.jpg`,
//     artists: `Lady gaga ${i}`,
//     last_listened: `${date}`,
//   });
// }
const UserHistory = () => {
  const UID = localStorage.getItem("UID");
  const [data, setData] = useState([]);
  const { activeSong } = useSelector((state) => state.player);
  console.log(activeSong);
  useEffect(() => {
    if (UID) {
      axios
        .get("http://localhost:9000/api/history/" + UID)
        .then(function (response) {
          setData(response.data.Data.reverse());
          console.log("data", data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [activeSong]);

  return (
    <div className="max-w-2xl xl:max-w-5xl">
      <h2 className="font-bold text-3xl text-white text-left">History</h2>
      <br />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 50,
        }}
        scroll={{
          y: 500,
        }}
      />
    </div>
  );
};
export default UserHistory;
