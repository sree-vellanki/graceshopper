import React, { useState, useEffect } from "react";
import {Button, Modal, Table} from "react-bootstrap";

const CartButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };
    const hideModal = () => {
      setIsOpen(false);
    };

    const CartModal = () => {
        let LocalCart = JSON.parse(localStorage.getItem("localCart"));

        const LineItem = ({name, price}) => {
            return (
                <tr>
                    <td>{name}</td>
                    <td>1</td>
                    <td>{price}</td>
                </tr>
            )
        }

        return (
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={isOpen} onHide={hideModal} className="log-reg-modal">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LocalCart.map((product) => (
                            <LineItem key={product.id} {...product} />
                        ))}
                    </tbody>
                </Table>
                <Modal.Footer>
                    <Button onClick={hideModal}>Cancel</Button>
                    <Button>Checkout</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div>
            <Button onClick={showModal}>cart</Button>
            <CartModal show={isOpen} onHide={hideModal} />
        </div>
    )
}

export default CartButton;