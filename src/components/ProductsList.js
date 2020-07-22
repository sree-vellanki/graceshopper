import React, {useState, useEffect} from "react";

import axios from "axios";
import ProductCard from "./ProductCard";

const ProductsList = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        axios.get("/api/products")
            .then((response) => {
                const list = response.data.products;
                console.log(list);

                setList(list);
            })
    }, []);

    return(
        <div className="items-list">
            {list.map(product => (
                <ProductCard
                    key={product.id}
                    {...product} />
            ))}
        </div>
    )
}

export default ProductsList;