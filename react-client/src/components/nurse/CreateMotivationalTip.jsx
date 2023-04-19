import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faMessage } from "@fortawesome/free-solid-svg-icons";

export const CREATE_TIP = gql`
  mutation createTip($tip: String!) {
    createMotivationalTip(message: $tip) {
      id
      message
    }
  }
`;

export default function CreateMotivationalTip() {
  let tip;

  const navigate = useNavigate();
  const [createTip, { data, error, loading }] = useMutation(CREATE_TIP);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTip({ variables: { tip: tip.value } });
    tip.value = "";
    navigate("/");
  };

  const onCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <Container>
        <h2>Create a new tip</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
              <Form.Label>
                Tip of the Day
                <FontAwesomeIcon
                  icon={faLightbulb}
                  size={"1x"}
                  color="orange"
                />
              </Form.Label>
            <br />
            <Form.Control
              type="text"
              name="message"
              id="message"
              placeholder="Enter message"
              ref={(node) => {
                tip = node;
              }}
            />
            <br />
          </Form.Group>

          <div className="button">
            <Button className="buttonSave" variant="primary" type="submit">
              Send
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
