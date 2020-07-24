import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import Axios from "axios";
import "./DetailsModal.css";



const DetailsModal = ({ show, onHide, name, price, description, photo }) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
      className="details-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"><b>{name}</b></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={`${photo}`} className="details-photo" />
        <p className="price">Price: ${price}</p>
        <p className="descriptHead">Product Description:</p>
        <p className="description">${description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cancel</Button>
        <Button>Add to cart</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailsModal;
