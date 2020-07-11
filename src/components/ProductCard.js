import React from "react";

const ProductCard = ({
    name,
    price,
    description,
    photo
}) => {
    return (
        <div className="item">
            <img src={`${photo}`} />
            <div className="item-info">
                <h3>{name}</h3>
                <p>{description}</p>
                <p>{price}</p>
            </div>
        </div>
    )
}

export default ProductCard;