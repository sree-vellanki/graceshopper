import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./ProductCard.css";
let localCart = [];
const ProductCard = ({ id, name, price, description, photo }) => {
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
  const DetailsModal = () => {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="details-modal"
        show={isOpen}
        onHide={hideModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={`${photo}`} className="details-photo" />
          <p>{price}</p>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hideModal}>Cancel</Button>
          <Button>Add to cart</Button>
        </Modal.Footer>
      </Modal>
    );
  };
  //currently not working because user needs to be logged in
  const addToCartRemote = () => {
    axios.post("/api/products/addToCart", { id, price }).then((response) => {
      console.log(response.data.cartedProduct);
    });
  };
  const addToCartLocal = () => {
    axios.post("/api/products/addToCartLocal", { id }).then((res) => {
      const addedProduct = res.data.cartedProduct;
      localCart.push(addedProduct);
      localStorage.setItem("localCart", JSON.stringify(localCart));
      console.log(localCart);
    });
    // localStorage.setItem("localCart", JSON.stringify(localCart));
  };
  return (
    <>
      <Card className="item">
        <Card.Img variant="top" src={`${photo}`} className="item-image" />
        <Card.Body className="item-info">
          <Card.Title>{name}</Card.Title>
          <p>{price}</p>
          <Button onClick={showModal}>View more..</Button>
          <Button onClick={addToCartLocal}>add to cart</Button>
        </Card.Body>
      </Card>
      <DetailsModal show={isOpen} onHide={hideModal} />
    </>
  );
};
export default ProductCard;
