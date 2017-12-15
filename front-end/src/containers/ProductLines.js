import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ProductRow from '../components/ProductRow';

class ProductLines extends Component{
    constructor(){
        super();
        this.state = {
            productList: [],
        }
        this.getProducts = this.getProducts.bind(this);
    }

    getProducts(props){
        const pl = this.props.match.params.productLines
        const url = `${window.apiHost}/productLines/${pl}/get`;
        console.log(url);
        axios.get(url)
        .then((response) => {
            this.setState({
                productList: response.data
            })
        })
    }

    componentDidMount(){
        this.getProducts(this.props);
    }

    componentWillReceiveProps(nextProps){
        this.getProducts(nextProps);
    }
    render(props){
        // console.log(this.props);
        console.log(this.props.pl)
        console.log(this.state.productList);
        const products = this.state.productList.map((product,index)=>{
            return(
                <ProductRow 
                        key={index}
                        product={product}
                />
            )
        })
        var thisPL = this.props.pl.filter((obj)=>{
            console.log(obj.productLine);
            console.log(this.props.match.params.productLine)
            return obj.productLine == this.props.match.params.productLines
        })
        if(thisPL.length === 0){
            var desc = ""
        } else {
            var desc = thisPL[0].textDescription
        }
        // console.log(thisPL[0])
        return(
            <div className="container">
                <h1>Welcome to the {this.props.match.params.productLines} page.</h1>
                <p>{desc}</p>
                <div className="products">
                    <table className="bordered highlight striped responsive-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Model Scale</th>
                                <th>Made By</th>
                                <th>Description</th>
                                <th>In Stock</th>
                                <th>Your Price!</th>
                                <th>MSRP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        pl:state.pl
    }
}

export default connect(mapStateToProps)(ProductLines);