import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import jwt from "jwt-decode";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    authenticate(email: $email, password: $password) {
      token
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading, error }] = useMutation(LOGIN);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await login({ variables: { email, password } });
    if (error) return `Login failed! ${error.message}`;
    if (data) {
      const decoded = jwt(data.authenticate.token);
      console.log(decoded);
      localStorage.setItem("userRole", decoded.userRole);
      localStorage.setItem("name", decoded.name);
      if (decoded.userRole === "patient") history("/patient");
      else history("/nurse");
    }
  };

  return (
    <div className="login container my-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
    );
}
