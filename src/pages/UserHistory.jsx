import React from "react";
import { Table, Image } from "antd";
const columns = [
  {
    title: "Index",
    dataIndex: "key",
    width: 50,
  },
  {
    title: "Image",
    dataIndex: "img",
    width: 100,
    render: (src) => <Image width={100} height={100} src={src} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Artist",
    dataIndex: "artists",
    width: 150,
  },
  {
    title: "Last Listened",
    dataIndex: "last_listened",
    width: 150,
  },
];
const date = new Date();
console.log(date);
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Born to be a star ${i}`,
    img: `https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/65/1b/f6/651bf621-fcf2-e3ba-4ef4-22645f26e0a0/11UMGIM12477.rgb.jpg/400x400cc.jpg`,
    artists: `Lady gaga ${i}`,
    last_listened: `${date}`,
  });
}
const UserHistory = () => (
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
        y: 550,
      }}
    />
  </div>
);
export default UserHistory;
