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
        let LocalCart = JSON.parse(localStorage.getItem("localCart")) || [];

        console.log(LocalCart)

        const test = (quantity, product) => {
            if (quantity < 1) {
                LocalCart.delete(product)
            } 
        }

        const LineItem = ({name, price}) => {
            const [quant, setQuant] = useState(1);

            return (
                <tr>
                    <td>{name}</td>
                    <td>{quant}
                    <button onClick={() => setQuant(quant - 1)}>-</button>
                    <button onClick={() => setQuant(quant + 1)}>+</button></td>
                    <td>{price}</td>
                    <td>{(quant * price).toFixed(2)}</td>
                </tr>
            )
        }

        const CheckoutAction = () => {
            alert("Package delivered!")
        }

        return (
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={isOpen} onHide={hideModal} className="log-reg-modal">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Item Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LocalCart.map((product) => (
                            <LineItem key={product.id} {...product} />
                        ))}
                        {/* <tr>
                            <td colSpan="3">Total Price:</td>
                        <td>yeehaw</td>
                        </tr> */}
                    </tbody>
                </Table>
                <Modal.Footer>
                    <Button onClick={hideModal}>Cancel</Button>
                    <Button onClick={CheckoutAction}>Checkout</Button>
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