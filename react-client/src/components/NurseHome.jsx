import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faPlusSquare, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Stack } from 'react-bootstrap';

export default function Nurse(){
    const name = localStorage.getItem('name');
    return (
      <div className="Jumbotron m-auto">
        <h2 className="text-center">Welcome {name}</h2>
        <Stack gap={2} className="col-md-5 mx-auto">
          <ListGroup>
            <ListGroup.Item action href="/nurse/alerts" className="listColor">
              <FontAwesomeIcon icon={faExclamationTriangle} color="red" />{" "}
              Emergency Alert
            </ListGroup.Item>
            <ListGroup.Item
              action
              href="/nurse/addvitals"
              className="listColor"
            >
              <FontAwesomeIcon icon={faPlusSquare} color="yellow" /> Vitals
            </ListGroup.Item>
            <ListGroup.Item
              action
              href="/nurse/patientinfo"
              className="listColor"
            >
              <FontAwesomeIcon icon={faInfoCircle} size={"1x"} color="green" />{" "}
              Access Patient Information
            </ListGroup.Item>
            <ListGroup.Item
              action
              href="/nurse/showMotivationalTip"
              className="listColor"
            >
              <FontAwesomeIcon icon={faLightbulb} size={"1x"} color="blue" />{" "}
              Motivational Tips
            </ListGroup.Item>

            <ListGroup.Item
              action
              href="/nurse/createMotivationalTip"
              className="listColor"
            >
              <FontAwesomeIcon icon={faLightbulb} size={"1x"} color="orange" />{" "}
              Send Daily Motivational Tip
            </ListGroup.Item>
          </ListGroup>
        </Stack>
      </div>
    );
}