import React from "react";
import { Table, Image } from "antd";
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
];

const Favorite = () => {
  const { likedSongList } = useSelector((state) => state.user);
  const data = likedSongList;
  return (
    <div>
      <h2 className="font-bold text-3xl text-white text-left">Favorite</h2>
      <br />
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 20,
        }}
        scroll={{
          y: 500,
        }}
      />
    </div>
  );
};

export default Favorite;
