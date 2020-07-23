import React, {useState, useEffect} from "react";
import {Card, Button, Modal} from "react-bootstrap";
import Axios from "axios";

import "./ProductCard.css"

const ProductCard = ({
    name,
    price,
    description,
    photo
}) => {
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
        <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="details-modal" show={isOpen} onHide={hideModal}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {name}
                </Modal.Title>
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
      )
    }

    // const AddedProduct = () => {
    //     return (
    //         <tr>
    //             <td>{name}</td>
    //             <td>{i++}</td>
    //             <td>{price}</td>
    //         </tr>
    //     )
    // }

    // onClick={AddedProduct.appendTo({CartModal})}

    return (
        <>
            <Card className="item">
                <Card.Img variant="top" src={`${photo}`} className="item-image" />
                <Card.Body className="item-info">
                    <Card.Title>{name}</Card.Title>
                    <p>{price}</p>
                    <Button onClick={showModal}>View more..</Button>
                    <Button>add to cart</Button>
                </Card.Body>
            </Card>
            <DetailsModal show={isOpen} onHide={hideModal} />
        </>
    )
}

export default ProductCard;