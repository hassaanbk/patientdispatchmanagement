import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperature1,
  faHeartbeat,
  faDroplet,
  faSnowflake,
  faMale,
} from "@fortawesome/free-solid-svg-icons";

export const ADD_VITALS = gql`
  mutation addVitals(
    $bodyTemperature: String!
    $heartRate: String!
    $bloodPressure: String!
    $respiratoryRate: String!
    $weight: String!
  ) {
    addVitalSign(
      bodyTemperature: $bodyTemperature
      heartRate: $heartRate
      bloodPressure: $bloodPressure
      respiratoryRate: $respiratoryRate
      weight: $weight
    ) {
      _id
    }
  }
`;

export default function AddVitals() {
  let bodyTemperature, heartRate, bloodPressure, respiratoryRate, weight;
  const navigate = useNavigate();
  const [addVitals, { data, loading, error }] = useMutation(ADD_VITALS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message} </p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    addVitals({
      variables: {
        bodyTemperature: bodyTemperature.value,
        heartRate: heartRate.value,
        bloodPressure: bloodPressure.value,
        respiratoryRate: respiratoryRate.value,
        weight: weight.value,
      },
    });
    console.log(data);
    bodyTemperature.value = "";
    heartRate.value = "";
    bloodPressure.value = "";
    respiratoryRate.value = "";
    weight.value = "";

    navigate("/nurse");
  };
  
  const onCancel = (e) => {
    e.preventDefault();
    navigate("/nurse");
  };

  return (
    <div>
      <Container className="container m-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              {" "}
              Body Temperature{" "}
              <FontAwesomeIcon icon={faTemperature1} size={"1x"} />
            </Form.Label>
            <Form.Control
              type="text"
              name="bodyTemperature"
              id="bodyTemperature"
              placeholder="Enter body temperature"
              ref={(node) => {
                bodyTemperature = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Heart Rate <FontAwesomeIcon icon={faHeartbeat} size={"1x"} />
            </Form.Label>
            <Form.Control
              type="text"
              name="heartRate"
              id="heartRate"
              placeholder="Enter heart rate"
              ref={(node) => {
                heartRate = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Blood Pressure <FontAwesomeIcon icon={faDroplet} size={"1x"} />
            </Form.Label>
            <Form.Control
              type="text"
              name="bloodPressure"
              id="bloodPressure"
              placeholder="Enter blood pressure"
              ref={(node) => {
                bloodPressure = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Respiratory Rate{" "}
              <FontAwesomeIcon icon={faSnowflake} size={"1x"} />
            </Form.Label>
            <Form.Control
              type="text"
              name="respiratoryRate"
              id="respiratoryRate"
              placeholder="Enter respiratory rate"
              ref={(node) => {
                respiratoryRate = node;
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Weight <FontAwesomeIcon icon={faMale} size={"1x"} />
            </Form.Label>
            <Form.Control
              type="text"
              name="weight"
              id="weight"
              placeholder="Enter weight"
              ref={(node) => {
                weight = node;
              }}
            />
          </Form.Group>

          <div className="button">
            <Button className="buttonSave" variant="primary" type="submit">
              Save
            </Button>
            <Button
              className="buttonCancel"
              variant="danger"
              type="submit"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
