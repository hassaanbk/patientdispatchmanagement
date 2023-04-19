import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

export const CREATE_EMERGENCY_ALERT = gql`
  mutation createEmergencyAlert($alertMessage: String!) {
    createEmergencyAlert(alertMessage: $message) {
      id
      message
    }
  }
`;

export default function EmergencyAlert() {
    let alertMessage, patient;
    const [createEmergencyAlert, {data, loading, error}] = useMutation(CREATE_EMERGENCY_ALERT);
    const navigate = useNavigate();

    if(loading) return <p>Loading...</p>;
    if(error) return <p>Error :</p>;
    
    const handleSubmit = (e) => {
        e.preventDefault();
        createEmergencyAlert({variables: {alertMessage: alertMessage.value}});
        alertMessage.value = '';
        navigate('/patient');
    }

    const handleCancel = () => {
        navigate('/patient');
    }

    return (
      <div>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="alertMessage">
              <Form.Label>Alert Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter alert message"
                ref={(node) => (alertMessage = node)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="secondary" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </Container>
      </div>
    );
};