import React from "react";
import { Container, Row, Col} from "react-bootstrap";


function Home(props) {
  return (
    <Container fluid className="container">
      <Row>
        <Col>
        <h1 className="mt-5">Patient Release Management System</h1>
          <p className="lead">
            Introducing our latest app designed to cater to the needs of nurse
            practitioners and their patients during the crucial first few weeks
            post-hospitalization. Our user-friendly application helps nurse
            practitioners monitor the progress of their patients remotely,
            ensuring timely intervention if necessary. Additionally, it
            empowers patients to take charge of their health and well-being by
            monitoring their daily activities.
          </p>
          <p>
            Our app utilizes cutting-edge technologies to deliver the best user
            experience. We use GraphQL to provide a robust and flexible API that
            enables seamless communication between the frontend and backend of
            the application. React, a popular JavaScript library, is used to
            create the user interface, delivering a responsive and interactive
            experience. Express, a Node.js framework, is utilized to create a
            scalable and performant backend that supports the GraphQL API.
            Moreover, we have incorporated machine learning algorithms to
            analyze the patient's data and generate personalized insights,
            allowing for more targeted interventions by the nurse
            practitioners. With our app, we strive to provide the best possible
            care for patients during the critical first few weeks
            post-hospitalization.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
