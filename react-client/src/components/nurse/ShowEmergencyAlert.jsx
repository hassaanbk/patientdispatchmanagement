import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Table } from "antd";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GET_ALERTS = gql`
  query getAlerts {
    emergenctAlerts {
      _id
      alert
    }
  }
`;

export default function ShowEmergencyAlert() {
  useEffect(() => {
    refetch();
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_ALERTS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const columns = [
    {
      dataIndex: "alertMessage",
      key: "alertMessage",
    },
  ];

  return (
    <div>
      <br />
      <br />
      <br />
      <center>
        <h2>
          Emergency Alert{" "}
          <FontAwesomeIcon icon={faExclamationTriangle} color="red" />
        </h2>
      </center>
      <br />
      <div className="nursePage">
        <h1>
          {" "}
          <Table
            className="tip"
            columns={columns}
            dataSource={data.emergencyAlerts}
            pagination={false}
          />
        </h1>
      </div>
    </div>
  );
}