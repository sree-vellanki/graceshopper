import React, { useState, useEffect } from "react";

import "./TopNavigation.css";

const TopNavigation = () => {
  const [navigation, setNavigation] = useState("");
<<<<<<< Updated upstream

  function handleNavigation(event) {
    setNavigation(event.target.value);
=======
  const [username, setUsername] = ("");
  const [password, setPassword] = ("");

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
    return(
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
            Modal heading
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
                <Form.Control type="password" placeholder="Password" value={password} />
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
                <Form.Control type="confirm-password" placeholder="Confirm password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Tab>
        </Tabs>
        </Modal.Body>
      </Modal>
    )
>>>>>>> Stashed changes
  }

  return (
    <div className="top-nav">
      <ul>
        <li>
          <a href="cart.asp">Cart</a>
        </li>
        <li>
          <a href="login.asp">Login</a>
        </li>
        <li>
          <a href="register.asp">Register</a>
        </li>
      </ul>
    </div>
  );
};

export default TopNavigation;
