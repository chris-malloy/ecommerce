import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class ProductLines extends Component{
    constructor(){
        super();
        this.state = {
            productList: [],
        }
    }

    componentDidMount(){
        const pl = this.props.match.params.productLine
        const url = `${window.apiHost}/productLines/${pl}/get`;
        axios.get(url)
        .then((response)=>{
            console.log(response)
        })
    }
    render(props){
        // console.log(this.props);
        console.log(this.props.pl)
        const products = this.state.productList.map((product,index)=>{
            return(<div></div>)
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