import React, { useState, useEffect } from "react";
import { Button, Modal, Tabs, Tab, Form } from "react-bootstrap";
import axios from "axios";

import "./TopNavigation.css";

import CartButton from "./Cart";

const TopNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navigation, setNavigation] = useState("");
  const [username, setUsername] = "";
  const [password, setPassword] = "";

  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };

  // useEffect(() => {
  //   axios.post((req) => {

  //   })
  // })

  // function handleNavigation(event) {
  //   event.preventDefault()
  //   setNavigation(event.target.value);
  // }

  const LoginRegisterModal = () => {
    return (
      <Modal
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={hideModal}
        className="log-reg-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Login/Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="login" className="tabs">
            <Tab eventKey="login" title="Log In">
              <Form>
                <Form.Group controlId="formLoginUsername" value={username}>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="formLoginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="register" title="Register">
              <Form>
                <Form.Group controlId="formRegUsername">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formRegPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formRegPasswordConfirm">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="confirm-password"
                    placeholder="Confirm password"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="top-nav">
      <h1>Merch Madness</h1>
      <Button onClick={showModal}>login/register</Button>
      <LoginRegisterModal show={isOpen} onHide={hideModal} />
      <CartButton />
    </div>
  );
};

export default TopNavigation;
