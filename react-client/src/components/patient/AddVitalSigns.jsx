import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CREATE_VITAL_SIGN = gql`
  mutation addVitalSign($bodyTemperature: Float!, $heartRate: Float!, 
    $respiratoryRate: Float!, $bloodPressure: Float!, 
    $weight:String!) {
        addVitalSign(
            bodyTemperature: $bodyTemperature,
            heartRate: $heartRate,
            respiratoryRate: $respiratoryRate,
            bloodPressure: $bloodPressure,
            weight: $weight
        ) {
            _id
        }
    }
`;

export default function AddVitalSigns() {
    let bodyTemperature, heartRate, respiratoryRate, bloodPressure, weight;
    const navigate = useNavigate();
    const [createVitalSign, { error, loading, data }] = useMutation(CREATE_VITAL_SIGN);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    const handleSubmit = (e) => {
        e.preventDefault();
        createVitalSign({
            variables: {
                bodyTemperature: bodyTemperature.value,
                heartRate: heartRate.value,
                respiratoryRate: respiratoryRate.value,
                bloodPressure: bloodPressure.value,
                weight: weight.value
            }
        });

        bodyTemperature.value = '';
        heartRate.value = '';
        bloodPressure.value = '';
        respiratoryRate.value = '';
        weight.value = '';

        navigate("/patient");
    }
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
};