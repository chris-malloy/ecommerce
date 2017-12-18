import React from 'react';

function CartRow(props){
    const product = props.product;
    return(
        <tr>
            <td>{product.productName}</td>
            <td>{product.buyPrice}</td> 
            <td><button className="btn red">Delete</button></td>
            <td><button className="btn blue">Save For later</button></td>
        </tr>
    )
}

export default CartRow;