import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Table } from "antd";

const GET_VITALS = gql`
  query getVitals {
    vitalSigns {
      _id
      bodyTemperature
      heartRate
      bloodPressure
      respiratoryRate
      weight
      patient
    }
  }
`;

export default function Vitals() {
  useEffect(() => {
    refetch();
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_VITALS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const columns = [
    {
      title: "Body Temperature",
      dataIndex: "bodyTemperature",
      key: "bodyTemperature",
    },
    {
      title: "Heart Rate",
      dataIndex: "heartRate",
      key: "heartRate",
    },
    {
      title: "Blood Pressure",
      dataIndex: "bloodPressure",
      key: "bloodPressure",
    },
    {
      title: "Respiratory Rate",
      dataIndex: "respiratoryRate",
      key: "respiratoryRate",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
  ];
  return (
    <div>
      <br />
      <br />
      <center>
        <h4>{data.vitalSigns.patient} Patient Vital Signs Information List</h4>
      </center>
      <br />
      <br />
      <Table
        className="tip"
        columns={columns}
        dataSource={data.vitalSigns}
        pagination={false}
      />
    </div>
  );
}
