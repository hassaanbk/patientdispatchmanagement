import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Table } from "antd";

const GET_TIP = gql`
  query {
    MotivationalTips {
      _id
      message
    }
  }
`;

export default function Tip() {
  useEffect(() => {
    refetch();
  }, []);
  const { loading, error, data, refetch } = useQuery(GET_TIP);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const columns = [
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];
  return (
    <div>
      <br />
      <br />
      <br />
      <center>
        <h2>Tip of the day!</h2>
      </center>
      <br />
      <div className="nursePage">
        <h1>
          <Table
            className="tip"
            columns={columns}
            dataSource={data.MotivationalTips}
            pagination={false}
          />
        </h1>
      </div>
    </div>
  );
}
