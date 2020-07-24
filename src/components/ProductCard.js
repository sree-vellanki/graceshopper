import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import Axios from "axios";

import "./ProductCard.css";

import DetailsModal from "./DetailsModal";

const ProductCard = ({ name, price, description, photo }) => {
  const [isOpen, setIsOpen] = useState(false);
  // NEED TO ADD REVIEWS TO DETAILS MODAL
  // const [reviews, setReviews] = useState([]);

  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };

  // NEED TO ADD REVIEWS TO DETAILS MODAL
  // useEffect(() => {
  //     Axios.get("/api/reviews")
  //         .then((resp) => {
  //             const reviews = resp
  //             console.log(resp)

  //             // setReviews(reviews);
  //         })
  // })

  return (
    <>
      <Card className="item">
        <Card.Img variant="top" src={`${photo}`} onClick={showModal} />
        <Card.Body className="item-info">
          <Card.Title>{name}</Card.Title>
          <p>${price}</p>
          <Button onClick={showModal}>View more..</Button>
          <Button>add to cart</Button>
        </Card.Body>
      </Card>
      <DetailsModal
        show={isOpen}
        onHide={hideModal}
        name={name}
        price={price}
        description={description}
        photo={photo}
      />
    </>
  );
};

export default ProductCard;
