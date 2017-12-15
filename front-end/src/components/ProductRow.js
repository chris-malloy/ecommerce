import React from 'react';

function ProductRow(props){
    const product = props.product
    if(product.quantityInStock > 100){
        var inStockClass = "";
        var inStock = "In Stock!"
    } else if(product.quantityInStock > 0){
        var inStockClass = "yellow";
        var inStock = "Order Soon!";
    } else {
        var inStockClass = "red";
        var inStock = 'Out of stock'
    }
    return(
        <tr>
            <td>{product.productName}</td>
            <td>{product.productScale}</td>
            <td>{product.productVendor}</td>
            <td>{product.productDescription}</td>
            <td className={inStockClass}>{inStock}</td>
            <td>{product.buyPrice}</td>
            <td>{product.MSRP}</td>
        </tr>
    )
};

export default ProductRow;