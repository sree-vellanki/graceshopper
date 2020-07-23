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
        return (
            <Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={isOpen} onHide={hideModal} className="log-reg-modal">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </Table>
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