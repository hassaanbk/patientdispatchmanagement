import {Form, Button} from 'react-bootstrap';

export default function Checklist() {
    return (
        
        <div className='container m-auto'>
            <h3>Check your signs and symptoms</h3>
            <Form method='get' action='/patient/result' className='form'>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Cholesterol" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Past Cardiac history" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Pain and numbness in extremities" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="High Blood pressure" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Shortness of breath" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Chest Tightness" />
                    </Form.Group>

                    <div className='button'>
                        <Button className='buttonSave' variant="primary" type="submit">
                            Submit
                        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button className='buttonCancel' variant="danger" type="submit" >
                            Cancel
                        </Button>
                    </div>
                </Form>
        </div>
    );
};