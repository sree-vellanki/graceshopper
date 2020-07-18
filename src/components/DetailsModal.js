import React from "react";
import {Modal} from "react-bootstrap";

import './DetailsModal.css';

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

const DetailsModal = ({
    name,
    price,
    description,
    photo
}) => {
    return (
        <div className="details-modal">
            <img src={`${photo}`} className="details-photo" />
            <div className="details-info">
                <h3>{name}</h3>
                <p>{description}</p>
                <p>{price}</p>
                <button>Add to cart</button>
            </div>
        </div>
    )
}

export default DetailsModal;