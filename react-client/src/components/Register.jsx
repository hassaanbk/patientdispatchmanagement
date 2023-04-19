import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
//import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

export const SIGN_UP = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $userRole: String!
    $phoneNumber: String!
  ) {
    createUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      userRole: $userRole
      phoneNumber: $phoneNumber
    ) {
      _id
    }
  }
`;

export default function Register() {
  let email, password, firstName, lastName, userRole, phoneNumber;
  const [signUp, { data, error, loading }] = useMutation(SIGN_UP);
  const history = useNavigate();

  const [user, setUsers] = useState("userRole");

  const handleRadioChange = (e) => {
    setUsers(e.target.value);
  };

  if (error) return <p>Error: {error.message}</p>;
  if (loading) return <p>Loading...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp({
      variables: {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        userRole: user,
        phoneNumber: phoneNumber.value,
      },
    });

    localStorage.setItem("userRole", user);
    localStorage.setItem("name", firstName.value);

    email.value = "";
    password.value = "";
    firstName.value = "";
    lastName.value = "";
    phoneNumber.value = "";

    if (user === "patient") history("/patient");
    else history("/nurse");
  };

  return (
    <div>
      <div className="Container container m-auto">
        <h1 className="text-center mb-5">Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={(node) => {
                email = node;
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={(node) => {
                password = node;
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              ref={(node) => {
                firstName = node;
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              ref={(node) => {
                lastName = node;
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              ref={(node) => {
                phoneNumber = node;
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicUserRole">
            <Form.Label>User Role</Form.Label>
            <div onChange={handleRadioChange}>
              <Form.Check
                inline
                label="Patient"
                type="radio"
                value="patient"
                name="userRole"
              />
              <Form.Check
                inline
                label="Nurse"
                type="radio"
                value="nurse"
                name="userRole"
              />
            </div>
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
