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
                <Table>
                    
                </Table>
            </Modal>
        )
    }

    return (
        <div>
            <Button>cart</Button>
        </div>
    )
}