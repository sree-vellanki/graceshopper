import React from "react";
import {Card, Button} from "react-bootstrap";

const ProductCard = ({
    name,
    price,
    photo
}) => {
    return (
        <Card className="item">
            <Card.Img variant="top" src={`${photo}`} />
            <Card.Body className="item-info">
                <Card.Title>{name}</Card.Title>
                <p>{price}</p>
                <Button>add to cart</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;