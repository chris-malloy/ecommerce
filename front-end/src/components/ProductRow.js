import React from 'react';

function ProductRow(props){
    // test to see if token exists (user logged in)
    // console.log(props.token)
    if(props.token === undefined){
        var button = "";
    } else {
        button = <button
                    className="btn"
                    onClick={()=>{
                        props.addToCart(props.token,product.productCode)
                    }}
                >Add</button>
    }
    const product = props.product
    if(product.quantityInStock > 100){
        var inStockClass = "";
        var inStock = "In Stock!"
    } else if(product.quantityInStock > 0){
        inStockClass = "yellow";
        inStock = "Order Soon!";
    } else {
        inStockClass = "red";
        inStock = 'Out of stock'
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
            <td>{button}</td>
        </tr>
    )
};

export default ProductRow;