import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Stack } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faGamepad, faLightbulb, faVideoCamera, faPlusSquare, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const name = localStorage.getItem('name');
export default function Patient() {
  return (
    <div className="container m-auto">
      <br />
      <h3 className="text-center"> Hello, {name}!</h3>
      <br />
      <Stack gap={2} className="col-md-5 mx-auto">
        <ListGroup>
          <ListGroup.Item action href="/showTip" className="listColor">
            <FontAwesomeIcon icon={faLightbulb} color="orange" size={"1x"} />{" "}
            Daily Tip
          </ListGroup.Item>

          <ListGroup.Item
            action
            href="/patient/addvitals"
            className="listColor"
          >
            <FontAwesomeIcon icon={faPlusSquare} size={"1x"} /> Add Daily
            Information
          </ListGroup.Item>

          <ListGroup.Item
            action
            href="/patient/checklist"
            className="listColor"
          >
            <FontAwesomeIcon icon={faInfoCircle} size={"1x"} color="green" />{" "}
            Checklist for common signs and symptoms
          </ListGroup.Item>

          <ListGroup.Item
            action
            href="/patient/emergenctAlert"
            className="listColor"
          >
            <FontAwesomeIcon icon={faExclamationTriangle} color="red" /> Send an
            Emergency Alert
          </ListGroup.Item>

          <ListGroup.Item
            action
            href="/patient/motivationalVideos"
            className="listColor"
          >
            <FontAwesomeIcon icon={faVideoCamera} /> Motivational Videos
          </ListGroup.Item>

          <ListGroup.Item
            action
            href="/patient/tiktaktoe"
            className="listColor"
          >
            <FontAwesomeIcon icon={faGamepad} /> Play some tiktaktoe
          </ListGroup.Item>
        </ListGroup>
      </Stack>
    </div>
  );

}