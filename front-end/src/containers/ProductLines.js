import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductLines extends Component{
    render(props){
        console.log(this.props);
        console.log(this.props.pl)
        var thisPL = this.props.pl.filter((obj)=>{
            console.log(obj);
            return obj.productLine == this.props.match.params.prodcutLine
        })
        if(thisPL.length === 0){
            var desc = ""
        } else {
            var desc = thisPL[0].textDescription
        }
        console.log(thisPL[0])
        return(
            <div>
                <h1>Welcome to the {this.props.match.params.productLine} page.</h1>
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